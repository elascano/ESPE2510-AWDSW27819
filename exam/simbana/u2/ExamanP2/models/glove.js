const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    serialNumber: { type: String },
    brand: { type: String },
    model: { type: String },
    price: { type: Number },
    day: { type: String }
  },
  { collection: "Gloves" }
);

module.exports = mongoose.model("Gloves", patientSchema);
