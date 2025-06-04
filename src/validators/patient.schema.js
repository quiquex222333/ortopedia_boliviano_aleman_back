const Joi = require("joi");

const patientSchema = Joi.object({
  identityNumber: Joi.number().required(),
  identityComplement: Joi.string().allow("", null),
  lastName: Joi.string().required(),
  middleName: Joi.string().allow("", null),
  firstName: Joi.string().allow("", null),
  birthDate: Joi.date().allow(null),
  civilStatus: Joi.string().allow("", null),
  biologicalGender: Joi.string().valid("masculino", "femenino").allow("", null),
  address: Joi.string().allow("", null),
  city: Joi.string().allow("", null),
  phone: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),
});

module.exports = { patientSchema };
