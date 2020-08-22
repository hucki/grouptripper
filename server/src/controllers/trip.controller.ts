import { Request, Response, NextFunction } from 'express';

import TripModel from '../models/trip.model';
import { getUserId } from '../getUser';

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // const userId = await getUserId(req);
    const response = await TripModel.find();
    res.json(response);
    res.status(200);
    return;
  } catch (e) {
    next(e);
  }
};

export const getOneTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    next(e);
  }
};

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = await getUserId(req);
    const tripInput = { ...req.body, ownerId: userId };
    const newTrip = await TripModel.create(tripInput);
    res.status(201);
    res.json(newTrip);
  } catch (e) {
    console.log(e);
    if (/validation failed/i.test(e._message)) {
      res.status(400);
      res.json({ message: 'Invalid data' });
    }
    next(e);
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await TripModel.findByIdAndDelete(req.params.id);
    res.json('Trip deleted');
    res.status(200);
  } catch (e) {
    next(e);
  }
};
