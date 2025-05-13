const Doctor = require('../models/doctor.model');

async function createDoctor(data) {
  return await Doctor.create(data);
}

async function getAllDoctors() {
  return await Doctor.find();
}

async function getDoctorById(id) {
  return await Doctor.findById(id);
}

async function updateDoctor(id, data) {
  return await Doctor.findByIdAndUpdate(id, data, { new: true });
}

async function deleteDoctor(id) {
  return await Doctor.findByIdAndDelete(id);
}

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
