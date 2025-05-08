const branchService = require('../services/branch.service');

async function create(req, res) {
  try {
    const branch = await branchService.createBranch(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  const branches = await branchService.getAllBranches();
  res.json(branches);
}

async function getById(req, res) {
  const branch = await branchService.getBranchById(req.params.id);
  if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });
  res.json(branch);
}

async function update(req, res) {
  const branch = await branchService.updateBranch(req.params.id, req.body);
  if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });
  res.json(branch);
}

async function remove(req, res) {
  const deleted = await branchService.deleteBranch(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Sucursal no encontrada' });
  res.json({ message: 'Sucursal eliminada' });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
