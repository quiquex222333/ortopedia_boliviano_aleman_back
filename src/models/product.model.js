const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  oldCode: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  salePrice: { type: Number, required: true },
  productionArea: {
    type: String,
    enum: ['ninguna', 'costura', 'yesos', 'plantillas', 'otros'],
    required: true
  },
  prescription: { type: Boolean, required: true },
  brand: { type: String, required: true },
  provider: { type: String, required: true },
  unitValue: { type: Number, required: true },
  barcode: { type: String, required: true },
  colors: [{ type: String }],
  categories: [{ type: String, required: true }],
  indications: { type: String, required: true },
  materials: [{ type: String, required: true }],
  technicalData: { type: String, required: true },
  multimedia: {
    type: {
      type: String,
      enum: ['imagen', 'video'],
      required: true
    },
    path: { type: String, required: true }
  },
  weight: { type: String, required: true },
  others: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
