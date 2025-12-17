const mongoose = require('mongoose');

const compactSchema = new mongoose.Schema(
    {
  idCompact: {type: String, required: true, unique: true},
        serial: {type: String, required: true},
        brand: {type: String, required: true},
        model: {type: String, required: true},
        brand: {type: String, required: true},
        price: {type: Number, required: true},
        type: {type: String, required: true},
        year: {type: String, required: true}
},
    {
        collection: 'compact',
       
    }
);

module.exports = mongoose.model('Compact', compactSchema);