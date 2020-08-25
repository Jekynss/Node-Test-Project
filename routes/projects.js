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

router.route("/:id").delete(AuthMiddl.GetAuth, AuthMiddl.PlanCanEdit,deleteProject).get(AuthMiddl.GetAuth, readProject).put(AuthMiddl.GetAuth,AuthMiddl.PlanCanEdit,updateProject);
router
  .route("/")
  .get(AuthMiddl.GetAuth, getAllProjects)
  .post(AuthMiddl.GetAuth, AuthMiddl.PlanCanEdit, addProject);

module.exports = router;
