const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";
const { userValidation } = require("../middlewares/Validation");
const { GetIdFromJWT } = require("../middlewares/Authentication");

exports.registerUser = async function (req, res, next) {
  userValidation(req.body, res);
  try {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        console.log(`this is true hash ${hash}`);
        try {
          const [user, created] = await User.findOrCreate({
            where: { email: req.body.email },
            defaults: {
              password: hash,
              name: req.body.name,
            },
          });
          if (!created) {
            return res
              .status(400)
              .json({ message: "email already taken", error: true });
          }
          let token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            jwtsecret,
            { expiresIn: 86400 }
          );
          return res.status(200).json({
            message: "Success! you have been registered",
            error: false,
            user,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message, error: true });
        }
      });
    });
  } catch (err) {
    if (err.status == 400) {
      return res.status(400).json({ message: err.message, error: true });
    }
    return res.status(500).json({ message: err.message, error: true });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, hash) {
        if (hash) {
          let token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            jwtsecret,
            { expiresIn: 86400 }
          );
          let userObj = { ...user.dataValues };
          delete userObj.password;
          delete userObj.createdAt;
          delete userObj.updatedAt;
          return res.status(200).json({
            message: "success",
            error: false,
            token: token,
            user: userObj,
          });
        }

        return res
          .status(401)
          .json({ message: "Wrong password!", error: true, field: "password" });
      });
    } else {
      return res
        .status(401)
        .json({ message: "Wrong email!", error: true, field: "password" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Error!", error: true });
  }
};

exports.getUser = async function (req, res, next) {
  try {
    const id = await GetIdFromJWT(req.headers.token);
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
