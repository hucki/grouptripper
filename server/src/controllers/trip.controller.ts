import { Request, Response } from 'express';

import TripModel from '../models/trip.model';

export const getAllTrips = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await TripModel.find();
    res.json(response);
    res.status(200);
    return;
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
    return;
  }
};

export const getOneTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const singleTrip = await TripModel.findById(req.params.id);
    if (singleTrip) {
      res.json(singleTrip);
      res.status(200);
    } else {
      res.status(404);
      res.json({ message: 'Trip not found' });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
  }
};

export const createTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTrip = await TripModel.create(req.body);
    res.status(201);
    res.json(newTrip);
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

export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await TripModel.findByIdAndDelete(req.params.id);
    res.json('Trip deleted');
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: 'Server error' });
  }
};
