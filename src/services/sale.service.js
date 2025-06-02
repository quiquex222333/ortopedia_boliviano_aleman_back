const Sale = require("../models/sale.model");

async function createSale(data) {
  return await Sale.create(data);
}

async function getAllSales() {
  return await Sale.find()
    .populate("patients")
    .populate("productsSold")
    .populate("products")
    .populate("changesHistory")
    .populate("payments")
    .populate("employee")
    .populate("branch");
}

async function getSaleById(id) {
  return await Sale.findById(id)
    .populate("patients")
    .populate("productsSold")
    .populate("products")
    .populate("changesHistory")
    .populate("payments")
    .populate("employee")
    .populate("branch");
}

async function updateSale(id, data) {
  return await Sale.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSale(id) {
  return await Sale.findByIdAndDelete(id);
}

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
