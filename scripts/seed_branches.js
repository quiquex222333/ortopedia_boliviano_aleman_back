const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Branch = require("../src/models/branch.model");
const { faker } = require("@faker-js/faker");

dotenv.config();

async function seedBranches() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Branch.deleteMany();

    for (let i = 0; i < 3; i++) {
      await Branch.create({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        phones: [faker.phone.number(), faker.phone.number()],
        openingHours: [
          { day: "Monday", from: "08:00", to: "17:00" },
          { day: "Saturday", from: "09:00", to: "13:00" },
        ],
        mapUrl: faker.internet.url(),
        imagePath: faker.image.urlLoremFlickr({ category: "building" }),
      });
    }

    console.log("✅ Sucursales creadas");
  } catch (error) {
    console.error("❌ Error al insertar sucursalues:", error);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = seedBranches;

if (require.main === module) {
  seedBranches();
}
