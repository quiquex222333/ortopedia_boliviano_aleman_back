const mongoose = require('mongoose');
const { dbUrl } = require('./config');

function connectDB() {
  return mongoose.connect(dbUrl);
}

module.exports = { connectDB };
