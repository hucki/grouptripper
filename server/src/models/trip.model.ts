import mongoose from './index';
import 'mongoose-geojson-schema';
import GeoJSON from 'geojson';
import { stopSchema } from './stop.model';

import { Document } from 'mongoose';

export type Trip = {
  _id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops?: string[];
  stopsCollection?: GeoJSON.FeatureCollection;
  details?: GeoJSON.FeatureCollection;
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
  stopsCollection: {
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true,
    },
    features: [stopSchema],
  },
  details: {
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true,
    },
    features: [stopSchema],
  },
});

export default mongoose.model<TripDocument>('Trip', tripSchema);
