const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    invoiceCode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      required: true,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
    ],
    productsSold: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoldProduct",
        required: true,
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    changesHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChangeHistory",
      },
    ],
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
