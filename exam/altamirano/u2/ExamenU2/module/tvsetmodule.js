const mongoose = require('mongoose');

const tvSetSchema = mongoose.Schema(
  {
    idtv: { type: String, required: true },
    smart: { type: Boolean, default: false },
    pulgadas: { type: Number },
    marca: { type: String },
    precio: { type: Number }
  },
  { collection: 'TvSet' }
);

module.exports = mongoose.model('TvSet', tvSetSchema);