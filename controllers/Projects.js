const models = require("../models");
const Project = models.Project;
const Profile = models.Profile;
const Profile_Projects = models.Profile_Projects;
const { projectValidation } = require("../middlewares/Validation");
const { Op } = require("sequelize");

exports.getAllProjects = async function (req, res, next) {
  try {
    const projects = await Project.findAll({
      include: [{ model: models.Profile, as: "profiles", required: false }],
    });
    res.status(200).json(projects);
  } catch {
    (err) => res.status(500).json(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  const id = req.params.id;
  Profile_Projects.destroy({ where: { project_id: id } });
  try {
    const num = await Project.destroy({
      where: { id: id },
    });
    console.log(num, "NUMM");
    if (num == 1) {
      res.send({
        message: "Project was deleted successfully!",
      });
    } else {
      res.status(400).send({
        error: `Cannot delete Project with id=${id}. Maybe Profile was not found!`,
      });
    }
  } catch {
    res.status(500).send({
      message: "Could not delete Project with id=" + id,
    });
  }
};

exports.addProject = async (req, res, next) => {
  profileValidation(req.body, res);
  const project = {
    name: req.body.name,
    status: req.body.status,
    stack: req.body.stack,
    price: req.body.price,
    description: req.body.description,
    developers: req.body.developers,
  };
  try {
    const profileIds = project.developers.map((elem) => parseInt(elem));
    const data = await Project.create(project);
    const profiles = await Profile.findAll({
      where: { id: { [Op.or]: profileIds } },
    });
    await data.setProfiles(profiles);

    const dataProfiles = await data.getProfiles();
    res.send({
      data: { ...data.dataValues, profiles: dataProfiles },
      message: "Project was successfully created!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Project.",
    });
  }
};

exports.readProject = async (req, res, next) => {
  const id = req.params.id;

  try {
    const project = await Project.findOne({
      include: [{ model: models.Profile, as: "profiles", required: false }],
      where: { id },
    });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
};

exports.updateProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const num = await Project.update(
      req.body,
      {
        where: { id: id },
        returning: true,
      }
    );
    if (num[0]===1) {
      res.send({...num[1][0].dataValues,
        message: "Project was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Project with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Project with id=" + id + `---->${err}`,
    });
  }
};
