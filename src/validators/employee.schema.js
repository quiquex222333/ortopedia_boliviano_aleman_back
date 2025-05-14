const Joi = require('joi');

const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  employeeType: Joi.string().valid('cashier', 'technician').required()
});

module.exports = { employeeSchema };
