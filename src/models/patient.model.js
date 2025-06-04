const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    identityNumber: {
      type: Number,
      required: true,
    },
    identityComplement: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    civilStatus: {
      type: String,
    },
    biologicalGender: {
      type: String,
      enum: ["masculino", "femenino"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
