const db = require("../config/db");
const models = require("../models");
const User = models.User;

exports.getUsers = async(req, res, next) => {
  try {
    const user = await User.findOne({ include: [{ model: models.Profile, as: "profile" }] })
        res.json(user.profile), res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
