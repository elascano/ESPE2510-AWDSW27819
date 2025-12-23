const mongoose = require('mongoose');
const specialtySchema = new mongoose.Schema(
    {
        id: {type: Number},
        name: {type: String},
        description: {type: String},
        deleted: { type: Boolean, default: false }
    },
    {
        collection: "Specialties"
    }
);
module.exports = mongoose.model("specialties", specialtySchema, "Specialties");