const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const Sale = require("../src/models/sale.model");
const Patient = require("../src/models/patient.model");
const Product = require("../src/models/product.model");
const SoldProduct = require("../src/models/soldProduct.model");
const Employee = require("../src/models/employee.model");
const Branch = require("../src/models/branch.model");

dotenv.config();

async function seedSales() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Sale.deleteMany();

    const patients = await Patient.find();
    const products = await Product.find();
    const soldProducts = await SoldProduct.find();
    const employees = await Employee.find();
    const branches = await Branch.find();

    if (
      !patients.length ||
      !products.length ||
      !soldProducts.length ||
      !employees.length ||
      !branches.length
    ) {
      throw new Error(
        "Se requieren pacientes, productos, productos vendidos, empleados y sucursales"
      );
    }

    for (let i = 0; i < 10; i++) {
      await Sale.create({
        invoiceCode: `INV${faker.number.int({ min: 1000, max: 9999 })}`,
        status: faker.helpers.arrayElement(["pending", "completed"]),
        patients: [faker.helpers.arrayElement(patients)._id],
        productsSold: [faker.helpers.arrayElement(soldProducts)._id],
        products: [faker.helpers.arrayElement(products)._id],
        changesHistory: [],
        payments: [],
        employee: faker.helpers.arrayElement(employees)._id,
        branch: faker.helpers.arrayElement(branches)._id,
      });
    }

    console.log("✅ Ventas insertadas correctamente.");
  } catch (error) {
    console.error("❌ Error al insertar ventas:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedSales();
}

module.exports = seedSales;
