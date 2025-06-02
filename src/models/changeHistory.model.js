const mongoose = require('mongoose');

const changeHistorySchema = new mongoose.Schema({
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Sale'
  },
  deliveryType: {
    type: String,
    enum: ['casa', 'sucursal'],
    required: true
  },
  deliveryDate: { type: Date },
  note: { type: String },
  amountReceived: { type: Number },
  discount: {
    type: {
      type: String,
      enum: ['porcentaje', 'moneda']
    },
    value: Number
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

module.exports = mongoose.model('ChangeHistory', changeHistorySchema);
