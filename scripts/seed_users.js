const User = require('../src/models/user.model');
const { hashPassword } = require('../src/utils/hash');

async function seedUsers() {
  await User.deleteMany();

  await User.create({
    email: 'demo@example.com',
    password: hashPassword('123456')
  });

  console.log('✅ Usuarios creados');
}

module.exports = seedUsers;
