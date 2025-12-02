const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  address: String,
  email: String,
  foundedYear: Number,
  stadium: String,
  league: String
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);

