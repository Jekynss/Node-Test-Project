const models = require("../models");
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";

exports.validateToken = async function (req, res, next) {
    jwt.verify(req.headers.token, jwtsecret, function(err, decoded) {
        if (err) {
            res.status(400).send(err);
        }
        else{
            res.status(200).send({message:"Token is valid"})
        }
      });
};
