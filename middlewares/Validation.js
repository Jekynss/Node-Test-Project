const Joi = require("@hapi/joi");

const profileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().optional().allow(""),
  website: Joi.string().optional().allow(""),
  address: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
  tokenId: Joi.optional().allow(""),
  image_url: Joi.string().required().uri(),
});

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required().email(),
  password: Joi.string().min(3).required(),
});

const projectSchema = Joi.object({
  name: Joi.string(),
  status:  Joi.string().valid('active','pending','completed','failed'),
  stack: Joi.array().items(Joi.string()),
  price: Joi.string(),
  description: Joi.string()
});

exports.userValidation = function (body, res) {
  const { error } = userSchema.validate(body);
  if (error) return res.status(400).send(error.details[0]);
};

exports.profileValidation = function (body, res) {
  const { error } = profileSchema.validate(body);
  if (error) {
    return res.status(400).send(error.details[0]);
  }
};

exports.projectValidation = function (body, res) {
  const { error } = projectSchema.validate(body);
  if (error) {
    return res.status(400).send(error.details[0]);
  }
};
