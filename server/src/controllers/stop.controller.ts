import { Request, Response, NextFunction } from 'express';
import TripModel from '../models/trip.model';
import StopModel from '../models/stop.model';

export const getOneStop = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const singleStop = await StopModel.findById(req.params.id);
    if (singleStop) {
      res.json(singleStop);
      res.status(200);
    } else {
      res.status(404);
      res.json({ message: 'Stop not found' });
    }
  } catch (e) {
    next(e);
  }
};

export const addStopToTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentTrip = await TripModel.findById(req.params.parentId);
    const addedToTrip = await currentTrip?.stopsCollection?.features.push(
      req.body
    );
    const doc = currentTrip?.save();
    res.status(201);
    res.json(doc);
  } catch (e) {
    console.log(e);
    if (/validation failed/i.test(e._message)) {
      res.status(400);
      res.json({ message: 'Invalid data' });
    }
    next(e);
  }
};

export const deleteStop = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await StopModel.findByIdAndDelete(req.params.id);
    res.json('Stop deleted');
    res.status(200);
  } catch (e) {
    next(e);
  }
};
