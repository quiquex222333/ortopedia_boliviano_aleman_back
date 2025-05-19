const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const productRoutes = require('../src/routes/product.routes');
const userRoutes = require('../src/routes/user.routes');
const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

let token;

beforeAll(async () => {

  const email = 'producttest@example.com';
  const password = '123456';
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email, password });

  token = res.body.token;
});

describe('Product Routes (protected)', () => {
  let productId;

  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldCode: 'P002',
        name: 'Muñequera ajustable',
        description: 'Diseño ergonómico',
        salePrice: 85.75,
        productionArea: 'plantillas',
        prescription: false,
        brand: 'SaludVital',
        provider: 'OrtoDistribuciones SRL',
        unitValue: 60.00,
        barcode: '9876543210987',
        colors: ['gris'],
        categories: ['muñequeras', 'ortesis'],
        indications: 'Soporte post-lesión',
        materials: ['elastano', 'nylon'],
        technicalData: 'Permite ajuste de presión sin broches',
        multimedia: {
          type: 'imagen',
          path: 'https://example.com/munequera.jpg'
        },
        weight: '150g',
        others: 'Incluye bolsa de transporte'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Muñequera ajustable');
    productId = res.body._id;
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get product by ID', async () => {
    const res = await request(app)
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(productId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldCode: 'P002',
        name: 'Muñequera premium',
        description: 'Diseño ergonómico',
        salePrice: 90.00,
        productionArea: 'plantillas',
        prescription: false,
        brand: 'SaludVital',
        provider: 'OrtoDistribuciones SRL',
        unitValue: 65.00,
        barcode: '9876543210987',
        colors: ['negro'],
        categories: ['muñequeras'],
        indications: 'Soporte leve',
        materials: ['neopreno'],
        technicalData: 'Diseño envolvente',
        multimedia: {
          type: 'imagen',
          path: 'https://example.com/munequera_premium.jpg'
        },
        weight: '160g',
        others: 'Incluye garantía'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Muñequera premium');
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Producto eliminado');
  });
});