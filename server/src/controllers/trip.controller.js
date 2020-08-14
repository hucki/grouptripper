const Trip = require('../models/trip.model.ts');
exports.getAllTrips = async (req, res) => {
    try {
        const response = await Trip.find();
        res.json(response);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
};
exports.addTrip = async (req, res) => {
    try {
        const { id, stops, label, description } = req.body;
        //Is this line needed?
        const newTrip = await Trip.create({ id, stops, label, description });
        res.json(newTrip);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
};
exports.getOneTrip = async (req, res) => {
    try {
        const singleTrip = await Trip.findById(req.params.id);
        res.json(singleTrip);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
};
