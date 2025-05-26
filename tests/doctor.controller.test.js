const request = require('supertest');
const express = require('express');
const app = express();

const doctorRoutes = require('../src/routes/doctor.routes');
const userRoutes = require('../src/routes/user.routes');
const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);

let token;

beforeAll(async () => {
  const email = 'doctortest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;
});

describe('Doctor Routes (protected)', () => {
  let doctorId;

  it('should create a doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Ana',
        lastName: 'López',
        middleName: 'Martínez'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('Ana');
    doctorId = res.body._id;
  });

  it('should get all doctors', async () => {
    const res = await request(app)
      .get('/api/doctors')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a doctor by ID', async () => {
    const res = await request(app)
      .get(`/api/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(doctorId);
  });

  it('should update a doctor', async () => {
    const res = await request(app)
      .put(`/api/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ firstName: 'Ana María', lastName: 'López', middleName: 'Martínez' });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('Ana María');
  });

  it('should delete a doctor', async () => {
    const res = await request(app)
      .delete(`/api/doctors/${doctorId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Doctor eliminado');
  });
});