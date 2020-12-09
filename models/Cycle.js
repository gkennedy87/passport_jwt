const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    startDate: {
        type: Date,
        required: true,
        max: 255
    },
    endDate: {
        type: Date,
        max: 255
    },
    duration: {
        type: Number,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Cycle', cycleSchema);