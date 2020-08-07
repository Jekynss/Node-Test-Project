const express = require("express");
const router = express.Router();
const {
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  readProfile,
} = require("../controllers/Profiles");

router.route("/").get(getProfiles).post(addProfile);

router
   .route("/:id")
   .delete(deleteProfile)
   .put(updateProfile)
   .get(readProfile);

module.exports = router;