const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../src/services/patient.service');

describe('Patient Service', () => {

  let patientId;

  it('should create a patient', async () => {
    const patient = await createPatient({
      identityNumber: 12345678,
      identityComplement: 'LP',
      lastName: 'González',
      middleName: 'Ramírez',
      firstName: 'Ana',
      birthDate: new Date('1990-05-10'),
      civilStatus: 'Soltera',
      biologicalGender: 'femenino',
      address: 'Av. Principal',
      city: 'La Paz',
      phone: '76543210',
      email: 'ana@example.com'
    });

    patientId = patient._id;
    expect(patient.firstName).toBe('Ana');
    expect(patient.identityNumber).toBe(12345678);
  });

  it('should get all patients', async () => {
    const patients = await getAllPatients();
    expect(Array.isArray(patients)).toBe(true);
    expect(patients.length).toBeGreaterThan(0);
  });

  it('should get patient by ID', async () => {
    const patient = await getPatientById(patientId);
    expect(patient).toBeTruthy();
    expect(patient._id.toString()).toBe(patientId.toString());
  });

  it('should update a patient', async () => {
    const updated = await updatePatient(patientId, { firstName: 'Ana María' });
    expect(updated.firstName).toBe('Ana María');
  });

  it('should delete a patient', async () => {
    const deleted = await deletePatient(patientId);
    expect(deleted).toBeTruthy();

    const findDeleted = await getPatientById(patientId);
    expect(findDeleted).toBeNull();
  });
});