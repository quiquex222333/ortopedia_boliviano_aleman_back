require('dotenv').config();
const mongoose = require('mongoose');

const seedUsers = require('./seed_users');
const seedDoctors = require('./seed_doctors');
const seedBranches = require('./seed_branches');
const seedEmployees = require('./seed_employees');

async function runAllSeeds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await seedUsers();
    await seedDoctors();
    await seedBranches();
    await seedEmployees();

    console.log('🎉 Base de datos poblada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

runAllSeeds();
