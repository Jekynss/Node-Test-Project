const express = require("express");
const router = express.Router();
const AuthMiddl = require("../middlewares/Authentication");

const {
  handleHook,
  handleCreateSubscription,
} = require("../controllers/Stripe");

router.route("/stripe-webhook").post(handleHook);

router.route("/subscriptions").post(handleCreateSubscription);

router.route("/secret").get(AuthMiddl.GetAuthWithoutStripe, async (req, res) => {
  res.json({ client_secret: process.env.STRIPE_PUBLIC_KEY });
});

module.exports = router;
