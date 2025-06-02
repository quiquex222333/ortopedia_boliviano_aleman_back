const Joi = require("joi");

const paymentSchema = Joi.object({
  changeHistoryId: Joi.string().required(),
  client: Joi.object({
    identityNumber: Joi.string().required(),
    complement: Joi.string().allow("", null),
    documentType: Joi.string().required(),
    businessName: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),
  paymentMethods: Joi.array()
    .items(
      Joi.object({
        method: Joi.string()
          .valid("qr", "efectivo", "tarjeta", "transaccion")
          .required(),
        amount: Joi.number().min(0.01).required(),
      })
    )
    .min(1)
    .required(),
  totalAmount: Joi.number().min(0.01).required(),
  paymentDate: Joi.date().optional(),
  employee: Joi.string().required(),
  branch: Joi.string().required(),
});

module.exports = { paymentSchema };
