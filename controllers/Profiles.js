const db = require("../config/db");
const models = require("../models");
const Profile = models.Profile;

exports.getProfiles = (req, res, next) => {
  Profile.findAll()
    .then((profile) => {
      res.json(JSON.parse(JSON.stringify(profile))), res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

exports.deleteProfile = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const id = req.params.id;

  Profile.destroy({
    where: { id: id },
  })
    .then((num) => {
      console.log(num);
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id,
      });
    });
};
exports.addProfile = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (!req.body.name || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
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

  Profile.create(profile)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
exports.updateProfile = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const id = req.params.id;

  Profile.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.readProfile = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const id = req.params.id;

  Profile.findOne({ where: { id } })
    .then((profile) => {
      res.json(JSON.parse(JSON.stringify(profile))), res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};
