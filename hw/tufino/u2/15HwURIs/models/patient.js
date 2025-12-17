const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        nombre: {type: String},
        telefono: {type: String},
        correo: {type: String},
        fechaNacimiento: {type: String},
        estado: {type: String}
    },
    {
        collection: "Patients"
    }
);
module.exports = mongoose.model("Patient", patientSchema);
