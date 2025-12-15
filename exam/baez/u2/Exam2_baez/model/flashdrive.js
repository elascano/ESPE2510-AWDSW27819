const mongoose = require("mongoose")
const flashdriveSchema = new mongoose.Schema(
    {
    serialnumber: {type: Number},
    brand: {type:String},
    model: {type:String},
    name: {type:String},
    role: {type:String, enum:['NEW', 'USED']},
    price: {type:Number},
    createdAt: {type: Date, default: Date.now}
    },
    {collection: "flashdrives"}
);
module.exports = mongoose.model("FlashDrive", flashdriveSchema);