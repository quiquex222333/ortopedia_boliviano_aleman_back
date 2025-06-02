const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const Payment = require("../src/models/payment.model");
const ChangeHistory = require("../src/models/changeHistory.model");
const Employee = require("../src/models/employee.model");
const Branch = require("../src/models/branch.model");

dotenv.config();

async function seedPayments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Payment.deleteMany();

    const changeHistories = await ChangeHistory.find();
    const employees = await Employee.find();
    const branches = await Branch.find();

    if (!changeHistories.length || !employees.length || !branches.length) {
      throw new Error(
        "Se requieren historiales, empleados y sucursales para poblar pagos."
      );
    }

    for (let i = 0; i < 10; i++) {
      const methods = ["qr", "efectivo", "tarjeta", "transaccion"];
      const methodCount = faker.number.int({ min: 1, max: 3 });
      const paymentMethods = Array.from({ length: methodCount }, () => ({
        method: faker.helpers.arrayElement(methods),
        amount: faker.number.float({ min: 10, max: 200, precision: 0.01 }),
      }));
      const total = paymentMethods.reduce((sum, p) => sum + p.amount, 0);

      await Payment.create({
        changeHistoryId: faker.helpers.arrayElement(changeHistories)._id,
        client: {
          identityNumber: faker.string.numeric(8),
          complement: faker.string.alpha(1),
          documentType: "CI",
          businessName: faker.person.fullName(),
          email: faker.internet.email(),
        },
        paymentMethods,
        totalAmount: total,
        employee: faker.helpers.arrayElement(employees)._id,
        branch: faker.helpers.arrayElement(branches)._id,
        paymentDate: faker.date.recent(),
      });
    }

    console.log("✅ Pagos insertados correctamente.");
  } catch (error) {
    console.error("❌ Error al insertar pagos:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedPayments();
}

module.exports = seedPayments;
