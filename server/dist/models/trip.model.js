"use strict";
const mongoose = require('./index.ts');
const Schema = mongoose.Schema;
const tripSchema = new mongoose.Schema({
    stops: {
        type: [String],
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
