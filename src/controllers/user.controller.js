const { registerUser, loginUser } = require('../services/user.service');
const { generateToken } = require('../utils/jwt');

async function register(req, res) {
  try {
    const user = await registerUser(req.body.email, req.body.password);
    res.status(201).json({ message: 'Usuario creado', user: { email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    const token = generateToken({ id: user._id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { register, login };
