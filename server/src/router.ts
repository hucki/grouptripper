import express from 'express';
import * as tripController from './controllers/trip.controller';
import * as photoController from './controllers/photo.controller';
import * as stopController from './controllers/stop.controller';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);
router.get('/trips/:id', tripController.getOneTrip);
router.post('/trips', tripController.createTrip);
router.delete('/trips/:id', tripController.deleteTrip);
router.get('/photos/:queryText', photoController.getPhoto);
router.get('/stops/:id', stopController.getOneStop);
router.delete('/trips/:tripId/stops/:stopId', stopController.deleteStop);
router.post('/trips/:tripId/stops/:stopId', stopController.addStopToTrip);

export default router;
