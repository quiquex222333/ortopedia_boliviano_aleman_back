const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const employeeRoutes = require('../src/routes/employee.routes');
const userRoutes = require('../src/routes/user.routes');
const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

let token;

beforeAll(async () => {

  const email = 'employeetest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;
});

describe('Employee Routes (protected)', () => {
  let employeeId;

  it('should create an employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Sofía',
        lastName: 'Mendoza',
        middleName: 'Rojas',
        employeeType: 'cajero',
        imagePath: 'https://example.com/employees/sofia.jpg'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('Sofía');
    expect(res.body.imagePath).toContain('sofia.jpg');
    employeeId = res.body._id;
  });

  it('should get all employees', async () => {
    const res = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get employees filtered by type', async () => {
    const res = await request(app)
      .get('/api/employees/filter?type=cajero')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.every(e => e.employeeType === 'cajero')).toBe(true);
  });

  it('should get employee by ID', async () => {
    const res = await request(app)
      .get(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(employeeId);
  });

  it('should update an employee', async () => {
    const res = await request(app)
      .put(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Sofía Belén',
        lastName: 'Mendoza',
        middleName: 'Rojas',
        employeeType: 'cajero',
        imagePath: 'https://example.com/employees/sofia_belen.jpg'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('Sofía Belén');
    expect(res.body.imagePath).toContain('sofia_belen.jpg');
  });

  it('should delete an employee', async () => {
    const res = await request(app)
      .delete(`/api/employees/${employeeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Empleado eliminado');
  });
});