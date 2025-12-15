const mongoose = require("mongoose");
const standSchema = new mongoose.Schema(
    {
        serial_number: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        is_new: { type: Boolean, required: true },
        price: { type: Number, required: true },
        final_price: { type: Number, required: true },
        __v: { type: Number }
    },
    { collection: "stand" }
);

module.exports = mongoose.model("stand", standSchema);