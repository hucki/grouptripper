const mongoose = require('./index.ts');

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  stops: {
    type: [String],
    required: false,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
