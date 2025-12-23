const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    lastname: { type: String },
    age: { type: Number },
    cellphone: { type: Number }
  },
  { collection: "Patients" }
);

module.exports = mongoose.model("Patients", patientSchema);
