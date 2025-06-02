const Joi = require('joi');

const soldProductSchema = Joi.object({
  patientId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});

module.exports = { soldProductSchema };