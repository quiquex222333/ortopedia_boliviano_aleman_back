const Joi = require('joi');

const patientSchema = Joi.object({
  identityNumber: Joi.number().required(),
  identityComplement: Joi.string().optional().allow(null, ''),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  firstName: Joi.string().required(),
  birthDate: Joi.date().required(),
  civilStatus: Joi.string().optional().allow(null, ''),
  biologicalGender: Joi.string().valid('masculino', 'femenino').required(),
  address: Joi.string().optional().allow(null, ''),
  city: Joi.string().optional().allow(null, ''),
  phone: Joi.string().optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, '')
});

module.exports = { patientSchema };