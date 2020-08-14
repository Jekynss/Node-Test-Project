const models = require("../models");
const Project = models.Project;
const {userValidation} = require('../middlewares/Validation');

exports.getAllProjects = async function (req, res, next) {
        try {
          const projects = await Project.findAll();
          projects.map(async(elem)=>{const profiles = await elem.getProfiles(); console.log({id:profiles.map((elem)=>elem.id),image_url:profiles.map((elem)=>elem.image_url)})});
          console.log(projectsWithProfiles);
          res.json(projects), res.sendStatus(200);
        } catch {
          (err) => res.status(500).json(projects);
        }
};
