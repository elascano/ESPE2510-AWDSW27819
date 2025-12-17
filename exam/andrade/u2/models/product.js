const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const productSchema = mongoose.Schema(
  {
    _id: { type: Number },
    ProductID: { type: Number },
    ProductNam: { type: String},
    Brand : { type: String },
    Price: { type: Number},
    Description: { type: String },
    IsActive: { type: Boolean, default: true },
    State: { type: String },

  },
  { collection: 'Product', _id: false }
);

module.exports = mongoose.model('Product', productSchema);