const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
    id: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    birthDate: {type: Date},
    age: {type: Number},
    gender: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
    medicalInfo: {type: String},
    emergencyContact: {type: String},
    emergencyPhone: {type: String},
    isActive: {type: Boolean}
    },
    {collection: "Student"}
);

module.exports = mongoose.model("Student", customerSchema);