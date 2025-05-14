const Doctor = require('../src/models/doctor.model');
const { faker } = require('@faker-js/faker');

async function seedDoctors() {
  await Doctor.deleteMany();

  for (let i = 0; i < 5; i++) {
    await Doctor.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.lastName()
    });
  }

  console.log('✅ Doctores creados');
}

module.exports = seedDoctors;
