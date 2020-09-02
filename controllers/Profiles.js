const db = require("../config/db");
const models = require("../models");
const Profile = models.Profile;
const multer = require("multer");
const hash = require("object-hash");
const rn = require("random-number");
const fs = require("fs");
const profileDir = "uploads/profiles/";
const { profileValidation } = require("../middlewares/Validation");

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    hashAvatar = hash(rn());
    let rec = profileDir + `${hashAvatar}`;
    if (!fs.existsSync(rec)) {
      fs.mkdirSync(rec);
    }
    cb(null, profileDir + `${hashAvatar}`);
  },
  filename: function (req, file, cb) {
    cb(null, `avatar` + ".png");
  },
});

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
  profileValidation(req.body, res);
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

  let update_string = req.body;
  const profile = await Profile.findOne({ where: { id: id } });
  if (req.file) {
    if (profile.image_url) {
      try {
        fs.unlinkSync(`uploads${profile.image_url.split("/uploads")[1]}`);
        fs.rmdirSync(
          `uploads/profiles/${
            profile.image_url.split("/avatar.png")[0].split("/")[5]
          }`
        );
      } catch (err) {
        console.log(err, "ERROR");
      }
    }
    update_string = {
      ...update_string,
      image_url: process.env.HOST + "/" + req.file.path,
    };
  }

  try {
    const num = await Profile.update(update_string, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was updated successfully.",
        image_url: update_string.image_url,
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
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
  }
};

exports.getProjects = async (req, res, next) => {
  const id = req.params.id;

  try {
    const profile = await Profile.findOne({ where: { id } });
    const profileProjects = await profile.getProjects();
    res.status(200).json(profileProjects);
  } catch (err) {
    console.log(err);
  }
};
