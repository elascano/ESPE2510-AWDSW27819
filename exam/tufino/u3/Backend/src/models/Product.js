const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
