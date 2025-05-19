const request = require('supertest');
const express = require('express');
const app = express();
const userRoutes = require('../src/routes/user.routes');

app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {

  it('should register a user', async () => {
    const res = await request(app).post('/api/users/register').send({
      email: 'controller@test.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('controller@test.com');
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'controller@test.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
