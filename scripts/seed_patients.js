const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Patient = require("../src/models/patient.model");

dotenv.config();

async function seedPatients() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Patient.deleteMany();

    for (let i = 0; i < 10; i++) {
      await Patient.create({
        identityNumber: faker.number.int({ min: 10000000, max: 99999999 }),
        identityComplement: faker.helpers.maybe(() =>
          faker.string.alpha({ length: 2 })
        ),
        lastName: faker.person.lastName(),
        middleName: faker.helpers.maybe(() => faker.person.lastName()),
        firstName: faker.helpers.maybe(() => faker.person.firstName()),
        birthDate: faker.helpers.maybe(() =>
          faker.date.birthdate({ min: 18, max: 90, mode: "age" })
        ),
        civilStatus: faker.helpers.maybe(() =>
          faker.helpers.arrayElement(["soltero", "casado", "divorciado"])
        ),
        biologicalGender: faker.helpers.maybe(() =>
          faker.helpers.arrayElement(["masculino", "femenino"])
        ),
        address: faker.helpers.maybe(() => faker.location.streetAddress()),
        city: faker.helpers.maybe(() => faker.location.city()),
        phone: faker.helpers.maybe(() => faker.phone.number()),
        email: faker.helpers.maybe(() => faker.internet.email()),
      });
    }

    console.log("✅ Pacientes de prueba insertados");
  } catch (error) {
    console.error("❌ Error al insertar pacientes:", error);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedPatients();
}

module.exports = seedPatients;
