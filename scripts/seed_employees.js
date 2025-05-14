const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Employee = require('../src/models/employee.model');

dotenv.config();

async function seedEmployees() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Employee.deleteMany();

    const types = ['cashier', 'technician'];

    for (let i = 0; i < 10; i++) {
      await Employee.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.lastName(),
        employeeType: types[i % 2]
      });
    }

    console.log('🧑‍💼 Empleados de prueba insertados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar empleados:', error);
    process.exit(1);
  }
}

module.exports = seedEmployees;
