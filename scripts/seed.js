require('dotenv').config();
const mongoose = require('mongoose');

const seedUsers = require('./seed_users');
const seedDoctors = require('./seed_doctors');
const seedBranches = require('./seed_branches');
const seedEmployees = require('./seed_employees');
const seedProducts = require('./seed_products');
const seedPatients = require('./seed_patients');
const seedChangeHistory = require('./seed_change_history');
const seedPayments = require('./seed_payments');
const seedSales = require('./seed_sales');

async function runAllSeeds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await seedUsers();
    await seedDoctors();
    await seedBranches();
    await seedEmployees();
    await seedProducts();
    await seedPatients();
    await seedChangeHistory();
    await seedPayments();
    await seedSales();

    console.log('🎉 Base de datos poblada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

runAllSeeds();
