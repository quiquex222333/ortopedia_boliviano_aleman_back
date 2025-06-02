const service = require("../services/sale.service");

async function create(req, res) {
  try {
    const sale = await service.createSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: "No se pudo registrar la venta" });
  }
}

async function getAll(req, res) {
  try {
    const sales = await service.getAllSales();
    res.json(sales);
  } catch (err) {
    res.status(400).json({ error: "No se pudieron obtener las ventas" });
  }
}

async function getById(req, res) {
  try {
    const sale = await service.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(sale);
  } catch (err) {
    res.status(400).json({ error: "No se pudo obtener la venta" });
  }
}

async function update(req, res) {
  try {
    const updated = await service.updateSale(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "No se pudo actualizar la venta" });
  }
}

async function remove(req, res) {
  try {
    const deleted = await service.deleteSale(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Venta no encontrada" });
    res.json({ message: "Venta eliminada correctamente" });
  } catch (err) {
    res.status(400).json({ error: "No se pudo eliminar la venta" });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
