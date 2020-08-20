import { Request, Response, NextFunction } from 'express';
import TripModel from '../models/trip.model';
import { StopCollection, Stop } from '../models/stop.model';

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
      if (singleStop.length) {
        res.status(200);
        res.json(singleStop);
      } else {
        res.sendStatus(204);
      }
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
    const currentStops = await TripModel.findById(req.params.tripId);
    if (currentStops?.stopsCollection?.features) {
      res.status(201);
      res.json(currentStops?.stopsCollection?.features);
    } else {
      res.status(400);
      res.json({ message: 'Stops not updated' });
    }
  } catch (e) {
    next(e);
  }
};

export const updateOneStop = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reqBody: Stop = req.body[0];
    const currentTrip = await TripModel.findById(req.params.tripId);
    const updateStopsCollection: Stop[] = [];
    const resultingStops = await currentTrip?.stopsCollection?.features.map(
      (stop) => {
        if (stop._id.toString() === req.params.stopId.toString()) {
          updateStopsCollection.push(reqBody);
          return reqBody;
        } else {
          updateStopsCollection.push(stop);
          return stop;
        }
      }
    );
    const updatedTrip = await TripModel.findByIdAndUpdate(req.params.tripId, {
      stopsCollection: {
        type: 'FeatureCollection',
        features: updateStopsCollection,
      },
      details: {
        type: 'FeatureCollection',
        features: updateStopsCollection,
      },
    });
    const currentStops = await TripModel.findById(req.params.tripId);
    if (currentStops?.stopsCollection?.features) {
      res.status(201);
      res.json(currentStops?.stopsCollection?.features);
    } else {
      res.status(400);
      res.json({ message: 'Stops not updated' });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteOneStop = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentTrip = await TripModel.findById(req.params.tripId);
    const updateStopsCollection: Stop[] = [];
    const resultingStops = await currentTrip?.stopsCollection?.features.map(
      (stop) => {
        if (stop._id.toString() === req.params.stopId.toString()) {
          return null;
        } else {
          updateStopsCollection.push(stop);
          return stop;
        }
      }
    );
    const updatedTrip = await TripModel.findByIdAndUpdate(req.params.tripId, {
      stopsCollection: {
        type: 'FeatureCollection',
        features: updateStopsCollection,
      },
      details: {
        type: 'FeatureCollection',
        features: updateStopsCollection,
      },
    });
    const currentStops = await TripModel.findById(req.params.tripId);
    if (currentStops?.stopsCollection?.features) {
      res.status(200);
      res.json(currentStops?.stopsCollection?.features);
    } else {
      res.status(400);
      res.json({ message: 'Stop not deleted' });
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
