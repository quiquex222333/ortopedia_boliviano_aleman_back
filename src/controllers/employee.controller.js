const service = require('../services/employee.service');

async function create(req, res) {
  try {
    const employee = await service.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo crear el empleado' });
  }
}

async function getAll(req, res) {
  const employees = await service.getAllEmployees();
  res.json(employees);
}

async function getById(req, res) {
  const employee = await service.getEmployeeById(req.params.id);
  if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json(employee);
}

async function update(req, res) {
  const employee = await service.updateEmployee(req.params.id, req.body);
  if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json(employee);
}

async function remove(req, res) {
  const deleted = await service.deleteEmployee(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json({ message: 'Empleado eliminado' });
}

async function getByType(req, res) {
  const type = req.query.type;
  if (!['admin', 'cajero', 'tecnico', 'almacenero', 'recepcionista', 'contador'].includes(type)) {
    return res.status(400).json({ error: 'Tipo de empleado inválido' });
  }
  const employees = await service.getEmployeesByType(type);
  res.json(employees);
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getByType
};
