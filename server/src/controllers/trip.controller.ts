import { Request, Response } from 'express';

import Trip from '../models/trip.model';

export const getAllTrips = async (req: Request, res: Response) => {
  try {
    const response = await Trip.find();
    res.json(response);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
  }
};

export const addTrip = async (req: Request, res: Response) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.json(newTrip);
    res.status(200);
  } catch (e) {
    console.log(e);
    if (/validation failed/i.test(e._message)) {
      res.status(400);
      res.json({ message: 'Invalid data' });
    }
    res.status(500);
    res.json({ message: 'Server error' });
  }
};

export const getOneTrip = async (req: Request, res: Response) => {
  try {
    const singleTrip = await Trip.findById(req.params.id);
    res.json(singleTrip);
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json('Trip deleted');
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
  }
};
