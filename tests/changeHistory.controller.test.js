const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const changeHistoryRoutes = require('../src/routes/changeHistory.routes');
const userRoutes = require('../src/routes/user.routes');
const Sale = require('../src/models/sale.model');
const Employee = require('../src/models/employee.model');
const Branch = require('../src/models/branch.model');
const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/change-history', changeHistoryRoutes);

let token, saleId, employeeId, branchId;

beforeAll(async () => {

  const email = 'changehistorytest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;

  const sale = await Sale.create({});
  saleId = sale._id;

  const employee = await Employee.create({
    firstName: 'Carlos',
    lastName: 'Rivera',
    middleName: 'López',
    employeeType: 'admin',
    imagePath: 'https://example.com/image.jpg'
  });

  const branch = await Branch.create({
    name: 'Sucursal Central',
    address: 'Av. Siempre Viva 742',
    city: 'La Paz',
    phones: ['76543210'],
    openingHours: [{ day: 'Lunes', from: '08:00', to: '16:00' }],
    mapUrl: 'https://example.com/mapa',
    imagePath: 'https://example.com/sucursal.jpg'
  });

  employeeId = employee._id;
  branchId = branch._id;
});

describe('ChangeHistory Routes (protected)', () => {
  it('should create a change history for a sale', async () => {
    const res = await request(app)
      .post('/api/change-history')
      .set('Authorization', `Bearer ${token}`)
      .send({
        saleId,
        deliveryType: 'casa',
        deliveryDate: '2024-06-10',
        note: 'Entrega coordinada',
        amountReceived: 150.50,
        discount: { type: 'moneda', value: 10 },
        employee: employeeId,
        branch: branchId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.saleId).toBe(saleId.toString());
  });

  it('should return change history by saleId', async () => {
    const res = await request(app)
      .get(`/api/change-history/${saleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should not create a change history if sale does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post('/api/change-history')
      .set('Authorization', `Bearer ${token}`)
      .send({
        saleId: fakeId,
        deliveryType: 'casa',
        employee: employeeId,
        branch: branchId
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('La venta no existe');
  });
});