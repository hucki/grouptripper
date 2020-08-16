import mongoose from './index';
import { Document } from 'mongoose';

export interface ITrip extends Document {
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops?: string[];
}

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

export default mongoose.model<ITrip>('Trip', tripSchema);
