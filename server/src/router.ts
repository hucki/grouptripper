import express from 'express';
import * as tripController from './controllers/trip.controller';
import * as photoController from './controllers/photo.controller';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);
router.get('/trips/:id', tripController.getOneTrip);
router.post('/trips', tripController.createTrip);
router.delete('/trips/:id', tripController.deleteTrip);
router.get('/photos/:queryText', photoController.getPhoto);

export default router;
