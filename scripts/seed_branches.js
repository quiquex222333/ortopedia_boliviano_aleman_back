const Branch = require('../src/models/branch.model');
const { faker } = require('@faker-js/faker');

async function seedBranches() {
  await Branch.deleteMany();

  for (let i = 0; i < 3; i++) {
    await Branch.create({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      phones: [faker.phone.number(), faker.phone.number()],
      openingHours: [
        { day: 'Monday', from: '08:00', to: '17:00' },
        { day: 'Saturday', from: '09:00', to: '13:00' }
      ],
      mapUrl: faker.internet.url(),
      imagePath: faker.image.urlLoremFlickr({ category: 'building' })
    });
  }

  console.log('✅ Sucursales creadas');
}

module.exports = seedBranches;
