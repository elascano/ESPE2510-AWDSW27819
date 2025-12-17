const mongoose = require('mongoose');
const pictureFrameSchema = new mongoose.Schema(
    {
        serialNumber: {type: Number},
        brand: {type: String},
        model: {type: String},
        color: {type: String},
        material: {type: String},
        new: {type: Boolean},
        price: {type: Number},
        finalPrice: {type: Number},
        deleted: {type: Boolean, default: false}
    },
    {
        collection: "pictureFrame"
    }
);


pictureFrameSchema.pre('save', function(next) {
    if (this.price != null) {
        const computed = this.price * 1.15;
        // store with two decimals
        this.finalPrice = Math.round(computed * 100) / 100;
    }
    next();
});
module.exports = mongoose.model("pictureFrame", pictureFrameSchema);