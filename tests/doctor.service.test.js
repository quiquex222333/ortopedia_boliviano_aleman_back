const mongoose = require('mongoose');
const Doctor = require('../src/models/doctor.model');
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../src/services/doctor.service');

describe('Doctor Service', () => {

  let doctorId;

  it('should create a new doctor', async () => {
    const doctor = await createDoctor({
      firstName: 'Carlos',
      lastName: 'Gómez',
      middleName: 'Pérez'
    });
    doctorId = doctor._id;
    expect(doctor.firstName).toBe('Carlos');
  });

  it('should retrieve all doctors', async () => {
    const doctors = await getAllDoctors();
    expect(Array.isArray(doctors)).toBe(true);
    expect(doctors.length).toBeGreaterThan(0);
  });

  it('should retrieve a doctor by ID', async () => {
    const doctor = await getDoctorById(doctorId);
    expect(doctor).toBeTruthy();
    expect(doctor._id.toString()).toBe(doctorId.toString());
  });

  it('should update a doctor', async () => {
    const updated = await updateDoctor(doctorId, { firstName: 'Carlos Eduardo' });
    expect(updated.firstName).toBe('Carlos Eduardo');
  });

  it('should delete a doctor', async () => {
    const deleted = await deleteDoctor(doctorId);
    expect(deleted).toBeTruthy();

    const findDeleted = await getDoctorById(doctorId);
    expect(findDeleted).toBeNull();
  });
});