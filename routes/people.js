const express = require("express");
const AuthMiddl = require('../middlewares/Authentication');

const router = express.Router();
const {
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  readProfile,
  registerUser,
  loginUser,
} = require("../controllers/Profiles");

router.route("/").get(/*AuthMiddl.GetAuth,*/getProfiles).post(/*AuthMiddl.GetAuth,*/addProfile);

router
   .route("/:id")
   .delete(deleteProfile)
   .put(updateProfile)
   .get(readProfile);

module.exports = router;