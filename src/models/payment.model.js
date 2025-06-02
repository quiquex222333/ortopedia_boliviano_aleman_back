const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  changeHistoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChangeHistory',
    required: true
  },
  client: {
    identityNumber: { type: String, required: true },
    complement: { type: String },
    documentType: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true }
  },
  paymentMethods: [{
    method: {
      type: String,
      enum: ['qr', 'efectivo', 'tarjeta', 'transaccion'],
      required: true
    },
    amount: { type: Number, required: true, min: 0.01 }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0.01
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
