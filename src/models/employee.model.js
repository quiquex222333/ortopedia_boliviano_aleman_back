const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  employeeType: {
    type: String,
    enum: ['admin', 'cajero', 'tecnico', 'almacenero', 'recepcionista', 'contador'],
    required: true
  },
  imagePath: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
