const service = require("../services/payment.service");

async function create(req, res) {
  try {
    const payment = await service.createPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    if (err.message === "El historial de cambio no existe") {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: "No se pudo registrar el pago" });
  }
}

async function getByChangeHistoryId(req, res) {
  try {
    const payments = await service.getPaymentsByChangeHistory(
      req.params.changeHistoryId
    );
    res.json(payments);
  } catch (err) {
    res.status(400).json({ error: "No se pudo obtener los pagos" });
  }
}

module.exports = {
  create,
  getByChangeHistoryId,
};
