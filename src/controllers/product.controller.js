const service = require('../services/product.service');

async function create(req, res) {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo crear el producto' });
  }
}

async function getAll(req, res) {
  const products = await service.getAllProducts();
  res.json(products);
}

async function getById(req, res) {
  const product = await service.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
}

async function update(req, res) {
  const product = await service.updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
}

async function remove(req, res) {
  const deleted = await service.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado' });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
