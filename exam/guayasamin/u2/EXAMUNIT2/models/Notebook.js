const mongoose = require('mongoose');

const NotebooksSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  id: { type: Number, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  countryOrigin: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },

}, { collection: 'notebooks' });

module.exports = mongoose.model('Notebooks', NotebooksSchema);