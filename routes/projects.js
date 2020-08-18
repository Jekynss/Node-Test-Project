const express = require("express");
const router = express.Router();
const AuthMiddl = require("../middlewares/Authentication");
const {
  getAllProjects,
  deleteProject,
  addProject,
} = require("../controllers/Projects");

router.route("/:id").delete(AuthMiddl.GetAuth, deleteProject);
router
  .route("/")
  .get(AuthMiddl.GetAuth, getAllProjects)
  .post(AuthMiddl.GetAuth, addProject);

module.exports = router;
