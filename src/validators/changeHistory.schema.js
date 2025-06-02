const Joi = require('joi');

const changeHistorySchema = Joi.object({
  saleId: Joi.string().required(),
  deliveryType: Joi.string().valid('casa', 'sucursal').required(),
  deliveryDate: Joi.date().optional().allow(null),
  note: Joi.string().optional().allow('', null),
  amountReceived: Joi.number().optional().allow(null),
  discount: Joi.object({
    type: Joi.string().valid('porcentaje', 'moneda').required(),
    value: Joi.number().required()
  }).optional().allow(null),
  employee: Joi.string().required(),
  branch: Joi.string().required()
});

module.exports = { changeHistorySchema };