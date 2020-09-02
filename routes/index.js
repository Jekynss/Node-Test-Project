const indexCtrl = require("../controllers/Index");
const express = require("express");
const router = express.Router();

router.route("/profiles/:hash/avatar.png").get(indexCtrl.avatarGet);

router.route('/').get((req, res) => {
    return res.send(':)')
});

module.exports = router;
