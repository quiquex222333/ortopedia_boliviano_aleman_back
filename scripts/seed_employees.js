const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Employee = require("../src/models/employee.model");

dotenv.config();

async function seedEmployees() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Employee.deleteMany();

    const types = [
      "admin",
      "cajero",
      "tecnico",
      "almacenero",
      "recepcionista",
      "contador",
    ];

    for (let i = 0; i < 12; i++) {
      await Employee.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.lastName(),
        employeeType: types[i % types.length],
        imagePath: faker.image.avatar(),
      });
    }

    console.log('✅ Empleados de prueba insertados correctamente.');
  } catch (error) {
    console.error('❌ Error al insertar empleados:', error);
  } finally {
    await mongoose.disconnect(); 
  }
}

if (require.main === module) {
  seedEmployees();
}

module.exports = seedEmployees;

if (require.main === module) {
  seedEmployees();
}
