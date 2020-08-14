const express = require("express");
const router = express.Router();
const {
  getAllProjects,
} = require("../controllers/Projects");

router.get('/',getAllProjects);

module.exports = router; 