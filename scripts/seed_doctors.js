const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('../src/models/doctor.model');
const { faker } = require('@faker-js/faker');

dotenv.config();

async function seedDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Doctor.deleteMany();
  
    for (let i = 0; i < 5; i++) {
      await Doctor.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.lastName()
      });
    }
  
    console.log('✅ Doctores creados');
  } catch (error) {
    console.error('❌ Error al insertar doctores:', error);
  } finally {
    await mongoose.disconnect(); 
  }
}

module.exports = seedDoctors;

if (require.main === module) {
  seedDoctors();
}
