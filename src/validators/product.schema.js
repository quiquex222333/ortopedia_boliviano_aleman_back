const Joi = require('joi');

const productSchema = Joi.object({
  oldCode: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  salePrice: Joi.number().precision(2).required(),
  productionArea: Joi.string().valid('ninguna', 'costura', 'yesos', 'plantillas', 'otros').required(),
  prescription: Joi.boolean().required(),
  brand: Joi.string().required(),
  provider: Joi.string().required(),
  unitValue: Joi.number().precision(2).required(),
  barcode: Joi.string().required(),
  colors: Joi.array().items(Joi.string()).optional(),
  categories: Joi.array().items(Joi.string()).required(),
  indications: Joi.string().required(),
  materials: Joi.array().items(Joi.string()).required(),
  technicalData: Joi.string().required(),
  multimedia: Joi.object({
    type: Joi.string().valid('imagen', 'video').required(),
    path: Joi.string().required()
  }).required(),
  weight: Joi.string().required(),
  others: Joi.string().required()
});

module.exports = { productSchema };