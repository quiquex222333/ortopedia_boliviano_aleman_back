const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const { registerUser, loginUser } = require('../src/services/user.service');
const { hashPassword } = require('../src/utils/hash');

describe('User Service', () => {

  it('should register a new user', async () => {
    const user = await registerUser('testuser@example.com', 'test123');
    expect(user.email).toBe('testuser@example.com');
  });

  it('should login with correct credentials', async () => {
    const user = await loginUser('testuser@example.com', 'test123');
    expect(user).toBeTruthy();
    expect(user.email).toBe('testuser@example.com');
  });

  it('should throw error for invalid credentials', async () => {
    await expect(loginUser('testuser@example.com', 'wrongpass')).rejects.toThrow('Credenciales inválidas');
  });

  it('should throw error when registering an existing user', async () => {
    await expect(registerUser('testuser@example.com', 'test123')).rejects.toThrow('El usuario ya existe');
  });
});