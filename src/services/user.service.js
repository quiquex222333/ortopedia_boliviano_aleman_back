const User = require('../models/user.model');
const { hashPassword } = require('../utils/hash');

async function registerUser(email, password) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('El usuario ya existe');
  const hashed = hashPassword(password);
  const user = await User.create({ email, password: hashed });
  return user;
}

async function loginUser(email, password) {
  const hashed = hashPassword(password);
  const user = await User.findOne({ email, password: hashed });
  if (!user) throw new Error('Credenciales inválidas');
  return user;
}

module.exports = { registerUser, loginUser };
