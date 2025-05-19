const Joi = require('joi');

const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  employeeType: Joi.string().valid(
    'admin',
    'cajero',
    'tecnico',
    'almacenero',
    'recepcionista',
    'contador'
  ).required(),
  imagePath: Joi.string().uri().optional()
});

module.exports = { employeeSchema };
