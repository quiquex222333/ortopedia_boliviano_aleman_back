const request = require('supertest');
const express = require('express');
const app = express();

const patientRoutes = require('../src/routes/patient.routes');
const userRoutes = require('../src/routes/user.routes');
const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);

let token;

beforeAll(async () => {
  const email = 'patienttest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;
});

describe('Patient Routes (protected)', () => {
  let patientId;

  it('should create a patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        identityNumber: 87654321,
        identityComplement: 'CB',
        lastName: 'López',
        middleName: 'Fernández',
        firstName: 'Mario',
        birthDate: '1985-03-20',
        civilStatus: 'Casado',
        biologicalGender: 'masculino',
        address: 'Zona Sur',
        city: 'Cochabamba',
        phone: '71234567',
        email: 'mario@example.com'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('Mario');
    patientId = res.body._id;
  });

  it('should get all patients', async () => {
    const res = await request(app)
      .get('/api/patients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get patient by ID', async () => {
    const res = await request(app)
      .get(`/api/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(patientId);
  });

  it('should update a patient', async () => {
    const res = await request(app)
      .put(`/api/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        identityNumber: 87654321,
        identityComplement: 'CB',
        lastName: 'López',
        middleName: 'Fernández',
        firstName: 'Mario Alberto',
        birthDate: '1985-03-20',
        civilStatus: 'Casado',
        biologicalGender: 'masculino',
        address: 'Zona Sur',
        city: 'Cochabamba',
        phone: '71234567',
        email: 'mario@example.com'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('Mario Alberto');
  });

  it('should delete a patient', async () => {
    const res = await request(app)
      .delete(`/api/patients/${patientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Paciente eliminado');
  });
});