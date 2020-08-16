const mongoose = require('./index.ts');

const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  stops: {
    type: [String],
    required: false,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
