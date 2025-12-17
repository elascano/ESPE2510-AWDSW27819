const mongoose = require('mongoose');

const soundMixSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('SoundMix', soundMixSchema);