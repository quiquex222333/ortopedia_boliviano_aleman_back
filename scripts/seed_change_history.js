const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const ChangeHistory = require("../src/models/changeHistory.model");
const Sale = require("../src/models/sale.model");
const Employee = require("../src/models/employee.model");
const Branch = require("../src/models/branch.model");

dotenv.config();

async function seedChangeHistory() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await ChangeHistory.deleteMany();

    const sales = await Sale.find();
    const employees = await Employee.find();
    const branches = await Branch.find();

    if (!sales.length || !employees.length || !branches.length) {
      throw new Error(
        "Se necesitan ventas, empleados y sucursales existentes para poblar el historial."
      );
    }

    for (let i = 0; i < 10; i++) {
      await ChangeHistory.create({
        saleId: faker.helpers.arrayElement(sales)._id,
        deliveryType: faker.helpers.arrayElement(["casa", "sucursal"]),
        deliveryDate: faker.date.future(),
        note: faker.lorem.sentence(),
        amountReceived: faker.number.float({
          min: 50,
          max: 200,
          precision: 0.01,
        }),
        discount: {
          type: faker.helpers.arrayElement(["porcentaje", "moneda"]),
          value: faker.number.float({ min: 5, max: 20, precision: 0.5 }),
        },
        employee: faker.helpers.arrayElement(employees)._id,
        branch: faker.helpers.arrayElement(branches)._id,
      });
    }

    console.log("✅ Historiales de cambios insertados correctamente.");
  } catch (error) {
    console.error("❌ Error al insertar historial de cambios:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedChangeHistory();
}

module.exports = seedChangeHistory;
