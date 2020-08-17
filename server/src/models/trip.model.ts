import mongoose from './index';
import { Document } from 'mongoose';

export type Trip = {
  _id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops?: string[];
};

export type TripDocument = Trip & Document;

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  stops: {
    type: [String],
    required: false,
  },
});

export default mongoose.model<TripDocument>('Trip', tripSchema);
