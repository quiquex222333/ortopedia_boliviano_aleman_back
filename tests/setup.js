require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/testdb';
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});