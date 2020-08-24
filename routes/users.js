const express = require("express");
const router = express.Router();
const AuthMiddl = require("../middlewares/Authentication");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/Users");

router.post('/registration',registerUser);
router.post("/login",loginUser);
router.get("/getCurrent",AuthMiddl.GetAuthWithoutStripe,getUser);

module.exports = router; 