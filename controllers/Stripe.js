const db = require("../config/db");
const models = require("../models");
const { default: Stripe } = require("stripe");
const User = models.User;
const {GetIdFromJWT} = require("../middlewares/Authentication")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getOrCreateCustomer(id, params) {
  const user = await User.findOne({ where: { id } });

  if (!user.customer_id) {
    const customer = await stripe.customers.create({
      email: user.email,
      ...params,
    });
    await user.update({ customer_id: customer.id });
    return customer;
  } else {
    return await stripe.customers.retrieve(user.customer_id);
  }
}

async function createSubscription(userId, plan, payment_method) {
  try {
    const customer = await getOrCreateCustomer(userId);

    const pm = await stripe.paymentMethods.attach(payment_method, {
      customer: customer.id,
    });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: pm.id },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: plan }],
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = subscription.latest_invoice;
    const payment_intent = invoice.payment_intent;
    const user = await User.findOne({ where: { id: userId } });

    user.update({
      customer_id: customer.id,
      subscription: subscription.id,
      status: "pending",
    });

    if (payment_intent.status === "succeeded") {
      user.update({
        status: "active",
      });
    }
    return subscription;
  } catch (err) {
    console.log(err, "ERROR");
  }
}

exports.handleCreateSubscription = async (req, res) => {
  try {
    const { plan, payment_method } = req.body;
    const userId = await GetIdFromJWT(req.headers.token);
    const subsciption = await createSubscription(
      userId,
      plan,
      payment_method
    );
    res.status(200).json(subsciption);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.handleHook = async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(`⚠️  Check the env file and enter the correct webhook secret.`);

    return res.sendStatus(400);
  }

  const dataObject = event.data.object;

  console.log(event.type, "EEEVENT");

  switch (event.type) {
    case "invoice.paid": {
      const user = await User.findOne({
        where: { customer_id: dataObject.customer },
      });
      user.update({ status: "active" });
      break;
    }

    case "invoice.payment_failed": {
      const user = await User.findOne({
        where: { customer_id: dataObject.customer },
      });
      user.update({ status: "failed" });
      break;
    }

    case "checkout.session.completed": {
      console.log(`🔔  Payment received!`);
      break;
    }

    default:
  }
  res.sendStatus(200);
};
