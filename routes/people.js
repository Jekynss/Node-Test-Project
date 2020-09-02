const express = require("express");
const multer = require("multer")
const AuthMiddl = require('../middlewares/Authentication');
const profileController = require('../controllers/Profiles')
const upload = multer({ storage: profileController.storage })

const router = express.Router();
const {
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  readProfile,
  getProjects,
} = require("../controllers/Profiles");

router.route("/").get(AuthMiddl.GetAuth,getProfiles).post(AuthMiddl.GetAuth,AuthMiddl.PlanCanEdit,upload.single('avatar'),addProfile);

router
   .route("/:id")
   .delete(AuthMiddl.GetAuth,AuthMiddl.PlanCanEdit,deleteProfile)
   .put(AuthMiddl.GetAuth,upload.single('avatar'),updateProfile)
   .get(AuthMiddl.GetAuth,AuthMiddl.PlanCanEdit,readProfile)

router
  .route("/:id/projects").get(AuthMiddl.GetAuth,getProjects)

module.exports = router;