const express = require("express");
const router = express.Router();
const AuthMiddl = require("../middlewares/Authentication");

const { handleHook,handleCreateSubscription } = require("../controllers/Stripe");

router.route("/stripe-webhook").post(handleHook);

router.route("/subscriptions").post(handleCreateSubscription);

module.exports = router;
