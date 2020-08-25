const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";
const models = require("../models");
const User = models.User;

exports.GetAuth = function (req, res, next) {
  try {
    jwt.verify(req.query.token || req.headers.token, jwtsecret, async function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({ message: "invalid token", error: true });
      }
      req.body.tokenId = decoded.id;
      const user = await User.findOne({ where: { id: decoded.id } });
      user.status === "active"
        ? next()
        : res
            .status(500)
            .json({ message: "Subscription not paid", error: true });
    });
  } catch (err) {
    return res.status(500).json({ message: err, error: true });
  }
};

exports.GetAuthWithoutStripe = function (req, res, next) {
  try {
    jwt.verify(req.query.token || req.headers.token, jwtsecret, async function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({ message: "invalid token", error: true });
      }
      req.body.tokenId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err, error: true });
  }
};

exports.GetIdFromJWT = async function (token) {
  try {
    const res = await jwt.verify(token, jwtsecret, async function (
      err,
      decoded
    ) {
      return decoded.id;
    });
    return res;
  } catch (err) {
    return null;
  }
};

exports.PlanCanEdit = function (req, res, next) {
  try {
    jwt.verify(req.query.token || req.headers.token, jwtsecret, async function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(401).json({ message: "invalid token", error: true });
      }
      req.body.tokenId = decoded.id;
      const user = await User.findOne({ where: { id: decoded.id } });
      user.planName !== "PRO"
        ? res
            .status(401)
            .send({
              message: "Your plan doesn't allow you to edit",
              error: true,
            })
        : next();
    });
  } catch (err) {
    return res.status(500).json({ message: err, error: true });
  }
};
