const Joi = require('joi');

const openingHourSchema = Joi.object({
  day: Joi.string().required(),
  from: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  to: Joi.string().pattern(/^\d{2}:\d{2}$/).required()
});

const branchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  imagePath: Joi.string().required(),
  phones: Joi.array().items(Joi.string().required()).min(1).required(),
  openingHours: Joi.array().items(openingHourSchema).min(1).required(),
  mapUrl: Joi.string().uri().required()
});

module.exports = { branchSchema };
