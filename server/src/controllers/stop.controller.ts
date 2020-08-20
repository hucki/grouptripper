import { Request, Response, NextFunction } from 'express';
import TripModel from '../models/trip.model';
import { StopCollection } from '../models/stop.model';
export const getOneStop = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentTrip = await TripModel.findById(req.params.tripId);
    const singleStop = currentTrip?.stopsCollection?.features?.filter(
      (stop) => stop._id.toString() === req.params.stopId.toString()
    );
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

export const updateStopArray = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    const currentTrip = await TripModel.findByIdAndUpdate(req.params.tripId, {
      stopsCollection: {
        type: 'FeatureCollection',
        features: req.body,
      },
      details: {
        type: 'FeatureCollection',
        features: req.body,
      },
    });
    console.log(currentTrip);
    const currentStops = currentTrip?.stopsCollection?.features;

    if (currentStops) {
      res.json(currentStops);
      res.status(201);
    } else {
      res.status(400);
      res.json({ message: 'Stops not updated' });
    }
  } catch (e) {
    next(e);
  }
};
// export const addStopToTrip = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const currentTrip = await TripModel.findById(req.params.parentId);
//     const addedToTrip = await currentTrip?.stopsCollection?.features.push(
//       req.body
//     );
//     const doc = currentTrip?.save();
//     res.status(201);
//     res.json(doc);
//   } catch (e) {
//     console.log(e);
//     if (/validation failed/i.test(e._message)) {
//       res.status(400);
//       res.json({ message: 'Invalid data' });
//     }
//     next(e);
//   }
// };

// export const deleteStop = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     await StopModel.findByIdAndDelete(req.params.id);
//     res.json('Stop deleted');
//     res.status(200);
//   } catch (e) {
//     next(e);
//   }
// };
