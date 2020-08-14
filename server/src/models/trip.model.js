const pimpedMongoose = require('./index.js');
const Schema = pimpedMongoose.Schema;
const tripSchema = new Schema({
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
const Trip = pimpedMongoose.model('Trip', tripSchema);
module.exports = Trip;
