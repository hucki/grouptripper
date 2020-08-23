import mongoose from './index';
import 'mongoose-geojson-schema';
import { stopSchema, StopCollection } from './stop.model';

import { Document } from 'mongoose';

export type Trip = {
  _id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops?: string[];
  ownerId: string;
  stopsCollection?: StopCollection;
  invitedEmails: string[];
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
  ownerId: {
    type: String,
    required: true,
  },
  stopsCollection: {
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true,
    },
    features: [stopSchema],
  },
  invitedEmails: [String],
});

export default mongoose.model<TripDocument>('Trip', tripSchema);
