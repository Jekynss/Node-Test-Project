const db = require("../config/db");
const models = require("../models");
const Profile = models.Profile;
const fieldsToExclude = ["password"];
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";

const goodFields = () => {
  return Object.keys(Profile.rawAttributes).filter(
    (s) => !fieldsToExclude.includes(s)
  );
};

exports.getProfiles = async (req, res, next) => {
  try {
    const profile = await Profile.findAll();
    res.json(profile), res.sendStatus(200);
  } catch {
    (err) => console.log(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  const id = req.params.id;

  try {
    const num = await Profile.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was deleted successfully!",
      });
    } else {
      res.status(400).send({
        error: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
      });
    }
  } catch {
    res.status(500).send({
      message: "Could not delete Profile with id=" + id,
    });
  }
};
exports.addProfile = async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const profile = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    website: req.body.website,
    phone: req.body.phone,
    image_url: req.body.image_url,
    address: req.body.address,
  };

  try {
    const data = await Profile.create(profile);
    res.send({ data, message: "Profile was successfully created!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Profile.",
    });
  }
};
exports.updateProfile = async (req, res, next) => {
  const id = req.params.id;

  try {
    const fieldss = goodFields();
    console.log(fieldss);
    const num = await Profile.update(
      req.body,
      { fields: fieldss },
      {
        where: { id: id },
      }
    );
    if (num == 1) {
      res.send({
        message: "Profile was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Profile with id=" + id + `---->${err}`,
    });
  }
};

exports.readProfile = async (req, res, next) => {
  const id = req.params.id;

  try {
    const profile = await Profile.findOne({ where: { id } });
    res.json(profile, res.sendStatus(200));
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async function (req, res, next) {
  try {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        console.log(`this is true hash ${hash}`);
        try{
        const [profile, created] = await Profile.findOrCreate({
          where: { email: req.body.email },
          defaults: {
            password: hash,
            name: req.body.name,
          },
        })
            if (!created) {
              return res
                .status(400)
                .json({ msg: "email already taken", error: true });
            }
            let token = jwt.sign(
              { id: profile.id, email: profile.email, name: profile.name },
              jwtsecret,
              { expiresIn: 86400 }
            );
            return res
              .status(200)
              .json({
                msg: "Success! you have been registered",
                error: false,
                profile,
                token: token,
              });
            }catch(error){
            return res.status(500).json({ msg: error.message, error: true });
          };
      });
    });
  } catch (err) {
    if (err.status == 400) {
      return res.status(400).json({ msg: err.message, error: true });
    }
    return res.status(500).json({ msg: err.message, error: true });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const profile = await Profile.findOne({
      where: { email: req.body.email },
    });
    if (profile) {
      bcrypt.compare(req.body.password, profile.password, function (err, hash) {
        if (hash) {
          let token = jwt.sign(
            { id: profile.id, email: profile.email, name: profile.name },
            jwtsecret,
            { expiresIn: 86400 }
          );
          let userObj = { ...profile.dataValues };
          delete userObj.password;
          return res
            .status(200)
            .json({
              msg: "success",
              error: false,
              token: token,
              user: userObj,
            });
        }

        return res
          .status(401)
          .json({ msg: "wrong password", error: true, field: "password" });
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "wrong login", error: true, field: "login" });
  }
};
