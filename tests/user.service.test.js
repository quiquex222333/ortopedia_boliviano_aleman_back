const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const { registerUser, loginUser } = require('../src/services/user.service');
const { hashPassword } = require('../src/utils/hash');

describe('User Service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should register a new user', async () => {
    const user = await registerUser('test@example.com', '123456');
    expect(user.email).toBe('test@example.com');
  });

  it('should login an existing user', async () => {
    const user = await loginUser('test@example.com', '123456');
    expect(user).toBeTruthy();
  });

  it('should fail login with wrong password', async () => {
    await expect(loginUser('test@example.com', 'wrongpass'))
      .rejects
      .toThrow('Credenciales inválidas');
  });
});
