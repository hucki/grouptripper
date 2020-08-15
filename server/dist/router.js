"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers = require('./controllers/trip.controller.ts');
router.get('/trips', controllers.getAllTrips);
router.post('/trips', controllers.addTrip);
router.get('/trips/:id', controllers.getOneTrip);
module.exports = router;
