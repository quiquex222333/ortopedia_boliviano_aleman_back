const ChangeHistory = require('../models/changeHistory.model');
const Sale = require('../models/sale.model');

async function createChangeHistory(data) {
  const saleExists = await Sale.exists({ _id: data.saleId });
  if (!saleExists) {
    throw new Error('La venta no existe');
  }
  return await ChangeHistory.create(data);
}

async function getChangeHistoryBySaleId(saleId) {
  return await ChangeHistory.find({ saleId })
    .populate('employee')
    .populate('branch');
}

module.exports = {
  createChangeHistory,
  getChangeHistoryBySaleId
};