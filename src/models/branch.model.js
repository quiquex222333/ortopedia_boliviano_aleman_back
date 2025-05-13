const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phones: [{ type: String }],
  openingHours: [{
    day: String,
    from: String,
    to: String
  }],
  mapUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
