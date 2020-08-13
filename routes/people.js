const express = require("express");
const AuthMiddl = require('../middlewares/Authentication');

const router = express.Router();
const {
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  readProfile,
} = require("../controllers/Profiles");

router.route("/").get(AuthMiddl.GetAuth,getProfiles).post(AuthMiddl.GetAuth,addProfile);

router
   .route("/:id")
   .delete(AuthMiddl.GetAuth,deleteProfile)
   .put(AuthMiddl.GetAuth,updateProfile)
   .get(AuthMiddl.GetAuth,readProfile);

module.exports = router;