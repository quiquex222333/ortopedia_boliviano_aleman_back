const Joi = require('joi');

const doctorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required()
});

module.exports = { doctorSchema };
