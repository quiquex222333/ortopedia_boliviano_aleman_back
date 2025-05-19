const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Product = require("../src/models/product.model");

dotenv.config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    const areas = ["ninguna", "costura", "yesos", "plantillas", "otros"];
    const multimediaTypes = ["imagen", "video"];

    for (let i = 0; i < 10; i++) {
      await Product.create({
        oldCode: faker.string.alphanumeric(6),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        salePrice: parseFloat(faker.commerce.price()),
        productionArea: areas[i % areas.length],
        prescription: faker.datatype.boolean(),
        brand: faker.company.name(),
        provider: faker.company.name(),
        unitValue: parseFloat(faker.commerce.price()),
        barcode: faker.string.numeric(13),
        colors: [faker.color.human()],
        categories: [faker.commerce.department()],
        indications: faker.lorem.sentence(),
        materials: [faker.commerce.productMaterial()],
        technicalData: faker.lorem.paragraph(),
        multimedia: {
          type: multimediaTypes[i % multimediaTypes.length],
          path: faker.internet.url(),
        },
        weight: faker.number.int({ min: 100, max: 1000 }) + "g",
        others: faker.lorem.sentence(),
      });
    }

    console.log("✅ Productos de prueba insertados");
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = seedProducts;

if (require.main === module) {
  seedProducts();
}
