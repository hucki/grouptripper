import express from 'express';
import * as tripController from './controllers/trip.controller';
import * as photoController from './controllers/photo.controller';
import * as stopController from './controllers/stop.controller';
import * as commentContoller from './controllers/comment.controller';
import { jwtCheck, getEmailAddress } from './middleware/authentication';

const router = express.Router();

// unauthenticated roots
router.delete('/trips/:id', tripController.deleteTrip);
router.get('/photos/single', photoController.getSinglePhoto);
router.get('/photos', photoController.getPhotos);

router.use(jwtCheck);

router.get('/comments/:tripId', commentContoller.getComments);
router.post('/comments', commentContoller.addComment);
router.delete('/comments/:commentId', commentContoller.deleteComment);
router.get('/trips', tripController.getAllTrips);
router.get('/trips/invited', getEmailAddress, tripController.getInvitedTrips);
router.get('/trips/:id', tripController.getOneTrip);
router.post('/trips', tripController.createTrip);
router.put('/trips/:tripId/invite', tripController.inviteParticipant);
router.put(
  '/trips/:tripId/accept_invite',
  getEmailAddress,
  tripController.acceptInvite
);
router.put(
  '/trips/:tripId/reject_invite',
  getEmailAddress,
  tripController.rejectInvite
);
router.get(
  '/trips/:tripId/participantProfiles',
  tripController.getUserProfiles
);
router.get('/tripstops/:tripId/stops/:stopId', stopController.getOneStop);
router.put('/tripstops/:tripId/stops', stopController.updateStopArray);
router.put('/tripstops/:tripId/stops/:stopId', stopController.updateOneStop);
router.delete('/tripstops/:tripId/stops/:stopId', stopController.deleteOneStop);
router.post('/tripstops/:tripId/stops', stopController.addStopToTrip);

export default router;
