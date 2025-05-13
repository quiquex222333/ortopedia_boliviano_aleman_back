const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const branchRoutes = require('../src/routes/branch.routes');
const userRoutes = require('../src/routes/user.routes');
const User = require('../src/models/user.model');
const Branch = require('../src/models/branch.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);

let token;

beforeAll(async () => {
  const email = 'branchtest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;
});

describe('Branch Routes (protected)', () => {
  it('should create a new branch', async () => {
    const res = await request(app)
      .post('/api/branches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sucursal Norte',
        address: 'Av. Siempre Viva 123',
        city: 'La Paz',
        imagePath: 'https://location.png',
        phones: ['+59170000000'],
        openingHours: [{ day: 'Monday', from: '08:00', to: '17:00' }],
        mapUrl: 'https://maps.google.com/?q=-16.5,-68.15'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Sucursal Norte');
  });

  it('should get all branches', async () => {
    const res = await request(app)
      .get('/api/branches')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a branch by ID', async () => {
    const createRes = await request(app)
      .post('/api/branches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sucursal Temporal',
        address: 'Av. Transitoria 456',
        city: 'Cochabamba',
        imagePath: 'https://location.png',
        phones: ['+59176000000'],
        openingHours: [{ day: 'Tuesday', from: '09:00', to: '18:00' }],
        mapUrl: 'https://maps.google.com/?q=-17.4,-66.15'
      });
  
    const branchId = createRes.body._id;
  
    const updateRes = await request(app)
      .put(`/api/branches/${branchId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sucursal Actualizada',
        address: 'Calle Nueva 789',
        city: 'Santa Cruz',
        imagePath: 'https://location.png',
        phones: ['+59178000000'],
        openingHours: [{ day: 'Wednesday', from: '10:00', to: '16:00' }],
        mapUrl: 'https://maps.google.com/?q=-17.8,-63.18'
      });
  
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe('Sucursal Actualizada');
  });
  
  it('should delete a branch by ID', async () => {
    const createRes = await request(app)
      .post('/api/branches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sucursal Para Borrar',
        address: 'Calle X 111',
        city: 'El Alto',
        imagePath: 'https://location.png',
        phones: ['+59177000000'],
        openingHours: [{ day: 'Friday', from: '08:00', to: '14:00' }],
        mapUrl: 'https://maps.google.com/?q=-16.55,-68.22'
      });
  
    const branchId = createRes.body._id;
  
    const deleteRes = await request(app)
      .delete(`/api/branches/${branchId}`)
      .set('Authorization', `Bearer ${token}`);
  
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe('Sucursal eliminada');
  });
});