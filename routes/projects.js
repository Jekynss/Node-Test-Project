const express = require("express");
const router = express.Router();
const AuthMiddl = require("../middlewares/Authentication");
const {
  getAllProjects,
  deleteProject,
  addProject,
  readProject,
  updateProject,
} = require("../controllers/Projects");

router.route("/:id").delete(AuthMiddl.GetAuth, deleteProject).get(AuthMiddl.GetAuth, readProject).put(AuthMiddl.GetAuth,updateProject);
router
  .route("/")
  .get(AuthMiddl.GetAuth, getAllProjects)
  .post(AuthMiddl.GetAuth, addProject);

module.exports = router;
