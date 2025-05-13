const doctorService = require('../services/doctor.service');

async function create(req, res) {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo crear el doctor' });
  }
}

async function getAll(req, res) {
  const doctors = await doctorService.getAllDoctors();
  res.json(doctors);
}

async function getById(req, res) {
  const doctor = await doctorService.getDoctorById(req.params.id);
  if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });
  res.json(doctor);
}

async function update(req, res) {
  const doctor = await doctorService.updateDoctor(req.params.id, req.body);
  if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });
  res.json(doctor);
}

async function remove(req, res) {
  const deleted = await doctorService.deleteDoctor(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Doctor no encontrado' });
  res.json({ message: 'Doctor eliminado' });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
