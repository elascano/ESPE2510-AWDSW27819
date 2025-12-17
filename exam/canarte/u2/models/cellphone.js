const mongoose = require('mongoose');

const cellphoneSchema = new mongoose.Schema(
{
    cellphoneId: { type: String, required: true, unique: true },
    serialNumber: { type: String, required: true, unique: true },
    brand:{type: String, required:true},
    model: {type: String, require: true},
    itsNew: {type:Boolean, required:true},
    price: {type: Number, required:true},
    iva: {type: Number, required:true},
    totalwithiva: {type: Number, required:true}
},
{
    collection: 'cellphone',
});

cellphoneSchema.pre("save", function(next) {
    let totalCost = 0;
    this.totalwithiva = this.price + (this.price * this.iva / 100);
    next();
});

module.exports = mongoose.model('Cellphone', cellphoneSchema);