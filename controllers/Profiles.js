const db = require("../config/db");
const models = require("../models");
const Profile = models.Profile;

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
    const num = await Profile.update(req.body, {
      where: { id: id },
    });
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
      message: "Error updating Profile with id=" + id,
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
