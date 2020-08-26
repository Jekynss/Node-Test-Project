const express = require("express");
const router = express.Router();

const { validateToken} = require("../controllers/Tokens");

router.route("/validate").get(validateToken);

module.exports = router;
