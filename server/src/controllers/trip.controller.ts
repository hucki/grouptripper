import { Request, Response } from 'express';

const Trip = require('../models/trip.model.ts');

exports.getAllTrips = async (req: Request, res: Response) => {
  try {
    const response = await Trip.find();
    res.json(response);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.addTrip = async (req: Request, res: Response) => {
  try {
    const { name, country, stops } = req.body;

    const newTrip = await Trip.create({ name, country, stops });
    res.json(newTrip);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.getOneTrip = async (req: Request, res: Response) => {
  try {
    const singleTrip = await Trip.findById(req.params.id);
    res.json(singleTrip);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.deleteTrip = async (req: Request, res: Response) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json('Trip deleted');
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};
