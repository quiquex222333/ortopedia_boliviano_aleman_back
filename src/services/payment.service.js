const Payment = require("../models/payment.model");
const ChangeHistory = require("../models/changeHistory.model");

async function createPayment(data) {
  const exists = await ChangeHistory.exists({ _id: data.changeHistoryId });
  if (!exists) {
    throw new Error("El historial de cambio no existe");
  }
  return await Payment.create(data);
}

async function getPaymentsByChangeHistory(changeHistoryId) {
  return await Payment.find({ changeHistoryId })
    .populate("employee")
    .populate("branch");
}

module.exports = {
  createPayment,
  getPaymentsByChangeHistory,
};
