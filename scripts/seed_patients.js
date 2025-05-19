const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Patient = require('../src/models/patient.model');

dotenv.config();

async function seedPatients() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Patient.deleteMany();

    const genders = ['masculino', 'femenino'];

    for (let i = 0; i < 10; i++) {
      await Patient.create({
        identityNumber: faker.number.int({ min: 1000000, max: 99999999 }),
        identityComplement: faker.helpers.arrayElement(['LP', 'CB', 'SC', '', null]),
        lastName: faker.person.lastName(),
        middleName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        birthDate: faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }),
        civilStatus: faker.helpers.arrayElement(['Soltero', 'Casado', 'Divorciado', '', null]),
        biologicalGender: faker.helpers.arrayElement(genders),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        phone: faker.phone.number('7#######'),
        email: faker.internet.email()
      });
    }

    console.log('✅ Pacientes de prueba insertados');
  } catch (error) {
    console.error('❌ Error al insertar pacientes:', error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedPatients();
}

module.exports = seedPatients;