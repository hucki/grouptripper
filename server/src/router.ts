import express from 'express';
const router = express.Router();

const controllers = require('./controllers/trip.controller.ts');

//get all trips
router.get('/trips', controllers.getAllTrips);

//add trip
router.post('/trips', controllers.addTrip);

//added delete route to clean up database
// router.delete('/trips/:id', controllers.deleteTrip);

router.get('/trips/:id', controllers.getOneTrip);

module.exports = router;
