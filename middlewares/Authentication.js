
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";


exports.GetAuth = function (req, res, next) {
  try {
    jwt.verify(req.query.token || req.headers.token, jwtsecret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ msg: "invalid token", error: true });
      }
      req.body.tokenId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err, error: true });
  }
};