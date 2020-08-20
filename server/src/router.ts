import express from 'express';
import * as tripController from './controllers/trip.controller';
import * as photoController from './controllers/photo.controller';
import * as stopController from './controllers/stop.controller';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);
router.get('/trips/:id', tripController.getOneTrip);
router.delete('/trips/:id', tripController.deleteTrip);
router.get('/photos/:queryText', photoController.getPhoto);
router.get('/tripstops/:tripId/stops/:stopId', stopController.getOneStop);
router.put('/tripstops/:tripId/stops', stopController.updateStopArray);
router.put('/tripstops/:tripId/stops/:stopId', stopController.updateOneStop);
router.delete('/tripstops/:tripId/stops/:stopId', stopController.deleteOneStop);
router.post('/tripstops/:tripId/stops', stopController.addStopToTrip);

export default router;
