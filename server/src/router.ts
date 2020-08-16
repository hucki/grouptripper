import express from 'express';
import * as tripController from './controllers/trip.controller';

const router = express.Router();

router.get('/trips', tripController.getAllTrips);
router.get('/trips/:id', tripController.getOneTrip);
router.post('/trips', tripController.addTrip);
router.delete('/trips/:id', tripController.deleteTrip);

export default router;
