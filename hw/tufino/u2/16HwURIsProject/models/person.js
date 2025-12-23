const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    day: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    year: {
        type: Number,
        required: true
    },
    age: {
        type: Number
    }
});

personSchema.methods.calculateAge = function() {
    const today = new Date();
    const birthDay = new Date(this.year, this.month - 1, this.day);
    
    let age = today.getFullYear() - birthDay.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = birthDay.getMonth();
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && today.getDate() < birthDay.getDate())) {
        age--;
    }
    
    return age;
};

personSchema.pre('save', async function() {
    this.age = this.calculateAge();
});

module.exports = mongoose.model('Person', personSchema);
