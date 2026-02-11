const mongoose = require("mongoose");

const totalSchema = new mongoose.Schema(
  {
    product_id: { type: Number },
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    unit: { type: String },
    brand: { type: String }
  },
  { collection: "Total" }
);

module.exports = mongoose.model("Total", totalSchema);


