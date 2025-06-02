const SoldProduct = require('../models/soldProduct.model');

async function createSoldProduct(data) {
  return await SoldProduct.create(data);
}

async function getSoldProductsByPatient(patientId) {
  return await SoldProduct.find({ patientId }).populate('productId');
}

module.exports = {
  createSoldProduct,
  getSoldProductsByPatient
};
