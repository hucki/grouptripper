import express from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import * as tripController from './controllers/trip.controller';

const router = express.Router();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-g7dchufc.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://grouptripper/api',
  issuer: 'https://dev-g7dchufc.eu.auth0.com/',
  algorithms: ['RS256'],
});

router.post('/trips', jwtCheck, tripController.createTrip);

export default router;
