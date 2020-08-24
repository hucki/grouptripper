import { Request, Response, NextFunction } from 'express';

import TripModel from '../models/trip.model';
import { sendMail } from '../middleware/emailing';

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.sub;
  try {
    const response = await TripModel.find({ participants: userId }).sort({
      startDate: 1,
    });
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
  const userId = req.user?.sub as string; // Auth middleware will guarantee us a user at this point
  try {
    const singleTrip = await TripModel.findById(req.params.id);
    if (singleTrip && !singleTrip.participants.includes(userId)) {
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
    const newTrip = await TripModel.create({
      ...req.body,
      ownerId: userId,
      participants: [userId],
    });
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

export const inviteParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email: newInviteEmail } = req.body;
  const userId = req.user?.sub as string; // Auth middleware will guarantee us a user at this point

  const info = await sendMail({
    subject: 'Invitation to a trip',
    to: newInviteEmail,
    text: 'Someone invited you to a trip',
  });

  try {
    const singleTrip = await TripModel.findById(req.params.tripId);
    if (singleTrip && !singleTrip.participants.includes(userId)) {
      res
        .status(403)
        .json({ message: 'You are not authorized to view this trip' });
    } else if (singleTrip) {
      if (!singleTrip.invitedEmails.includes(newInviteEmail)) {
        singleTrip.invitedEmails.push(newInviteEmail);
        await singleTrip.save();
      }
    } else {
      res.status(404);
      res.json({ message: 'Trip not found' });
    }
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

export const getInvitedTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email = req.email;
  if (!email) {
    res.status(401);
    res.json({ message: 'No email address for your account' });
    return;
  }
  try {
    const response = await TripModel.find({ invitedEmails: email }).sort({
      startDate: 1,
    });
    res.json(response);
    res.status(200);
    return;
  } catch (e) {
    next(e);
  }
};

export const acceptInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('accepting invite...');
  const acceptingEmail = req.email as string; // Middleware guarantees this exists
  const userId = req.user?.sub;
  if (!userId) {
    res.status(401).json({ message: 'No user found' });
    return;
  }

  console.log('accepting email', acceptingEmail, 'userId', userId);
  try {
    const singleTrip = await TripModel.findById(req.params.tripId);
    console.log('found trip', singleTrip);
    if (singleTrip && !singleTrip.invitedEmails.includes(acceptingEmail)) {
      res.status(403).json({ message: 'You are not invited to this trip' });
    } else if (singleTrip) {
      singleTrip.invitedEmails = singleTrip.invitedEmails.filter(
        (email) => email !== acceptingEmail
      );
      console.log('about to accept');
      singleTrip.participants.push(userId);
      await singleTrip.save();
      res.status(200);
      res.json(singleTrip);
    } else {
      res.status(404);
      res.json({ message: 'Trip not found' });
    }
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

export const rejectInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const acceptingEmail = req.email as string; // Middleware guarantees this exists
  const userId = req.user?.sub;
  if (!userId) {
    res.status(401).json({ message: 'No user found' });
    return;
  }
  try {
    const singleTrip = await TripModel.findById(req.params.tripId);
    if (singleTrip && !singleTrip.invitedEmails.includes(acceptingEmail)) {
      res.status(403).json({ message: 'You are not invited to this trip' });
    } else if (singleTrip) {
      console.log('about to reject');
      singleTrip.invitedEmails = singleTrip.invitedEmails.filter(
        (email) => email !== acceptingEmail
      );
      await singleTrip.save();
      res.status(200);
      res.json(singleTrip);
    } else {
      res.status(404);
      res.json({ message: 'Trip not found' });
    }
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
