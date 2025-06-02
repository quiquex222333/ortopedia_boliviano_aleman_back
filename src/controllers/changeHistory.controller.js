const service = require('../services/changeHistory.service');

async function create(req, res) {
    try {
      const change = await service.createChangeHistory(req.body);
      res.status(201).json(change);
    } catch (err) {
      if (err.message === 'La venta no existe') {
        return res.status(404).json({ error: err.message });
      }
      res.status(400).json({ error: 'No se pudo registrar el cambio en el historial' });
    }
  }

async function getBySaleId(req, res) {
  try {
    const history = await service.getChangeHistoryBySaleId(req.params.saleId);
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo obtener el historial de cambios' });
  }
}

module.exports = {
  create,
  getBySaleId
};