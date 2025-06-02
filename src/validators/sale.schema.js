const Joi = require("joi");

const saleSchema = Joi.object({
  invoiceCode: Joi.string().required(),
  status: Joi.string().valid("pending", "completed").required(),
  patients: Joi.array().items(Joi.string().required()).min(1).required(),
  productsSold: Joi.array().items(Joi.string().required()).min(1).required(),
  products: Joi.array().items(Joi.string().required()).min(1).required(),
  changesHistory: Joi.array().items(Joi.string()),
  payments: Joi.array().items(Joi.string()),
  employee: Joi.string().required(),
  branch: Joi.string().required(),
});

module.exports = { saleSchema };
