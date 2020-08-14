const mongoose = require('./index.js');

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
  stops: {
    type: [String],
    required: false,
  },
  label: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
