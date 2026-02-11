const mongoose = require('mongoose');

const vinylRecordSchema = new mongoose.Schema(
  {
    serialnumber: { type: String, required: true, unique: true },
    name: { type: String },
    prize: { type: Number },
    amount: { type: Number },
    brand: { type: String },
    isActive: { type: Boolean, default: true },
    state: { type: String }
  },
  { collection: 'vinylrecords' }
);

module.exports = mongoose.model('VinylRecord', vinylRecordSchema);