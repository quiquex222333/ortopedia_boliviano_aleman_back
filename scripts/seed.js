// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../src/models/user.model');
const Doctor = require('../src/models/doctor.model');
const Branch = require('../src/models/branch.model');
const { hashPassword } = require('../src/utils/hash');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Limpiar colecciones
    await User.deleteMany();
    await Doctor.deleteMany();
    await Branch.deleteMany();

    // Crear usuario demo
    const demoUser = await User.create({
      email: 'demo@example.com',
      password: hashPassword('123456')
    });
    console.log('Usuario demo creado: demo@example.com / 123456');

    // Crear doctores
    for (let i = 0; i < 5; i++) {
      await Doctor.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.lastName()
      });
    }

    // Crear sucursales
    for (let i = 0; i < 3; i++) {
      await Branch.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        phones: [faker.phone.number(), faker.phone.number()],
        emailPath: faker.image.url(),
        openingHours: [
          { day: 'Monday', from: '08:00', to: '17:00' },
          { day: 'Saturday', from: '09:00', to: '13:00' }
        ],
        mapUrl: faker.internet.url()
      });
    }

    console.log('Base de datos poblada con datos de prueba.');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seed();
