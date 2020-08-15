"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip = require('../models/trip.model.ts');
exports.getAllTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Trip.find();
        res.json(response);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
});
exports.addTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stops, label, description } = req.body;
        const newTrip = yield Trip.create({ stops, label, description });
        res.json(newTrip);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
});
exports.getOneTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleTrip = yield Trip.findById(req.params.id);
        res.json(singleTrip);
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
});
