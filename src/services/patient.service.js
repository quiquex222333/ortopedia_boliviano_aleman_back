const Patient = require('../models/patient.model');

async function createPatient(data) {
  return await Patient.create(data);
}

async function getAllPatients() {
  return await Patient.find();
}

async function getPatientById(id) {
  return await Patient.findById(id);
}

async function updatePatient(id, data) {
  return await Patient.findByIdAndUpdate(id, data, { new: true });
}

async function deletePatient(id) {
  return await Patient.findByIdAndDelete(id);
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};