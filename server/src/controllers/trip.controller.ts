import { Request, Response, NextFunction } from 'express';

import TripModel from '../models/trip.model';

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.sub;
  try {
    const response = await TripModel.find({ ownerId: userId });
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
  const userId = req.user?.sub;
  console.log('userId', userId);
  try {
    const singleTrip = await TripModel.findById(req.params.id);
    if (singleTrip && singleTrip.ownerId !== userId) {
      res
        .status(403)
        .json({ message: 'You are not authorized to view this trip' });
    } else if (singleTrip) {
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
  const userId = req.user?.sub;
  if (!userId) {
    res.status(401).json({ message: 'No user found' });
    return;
  }
  try {
    const newTrip = await TripModel.create({ ...req.body, ownerId: userId });
    res.status(201);
    res.json(newTrip);
  } catch (e) {
    console.error(e);
    if (/validation failed/i.test(e._message)) {
      res.status(400);
      res.json({ message: 'Invalid data' });
      return;
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
