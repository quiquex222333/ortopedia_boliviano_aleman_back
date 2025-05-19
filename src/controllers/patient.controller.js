const service = require('../services/patient.service');

async function create(req, res) {
  try {
    const patient = await service.createPatient(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo crear el paciente' });
  }
}

async function getAll(req, res) {
  const patients = await service.getAllPatients();
  res.json(patients);
}

async function getById(req, res) {
  const patient = await service.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json(patient);
}

async function update(req, res) {
  const patient = await service.updatePatient(req.params.id, req.body);
  if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json(patient);
}

async function remove(req, res) {
  const deleted = await service.deletePatient(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json({ message: 'Paciente eliminado' });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};