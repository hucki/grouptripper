import mongoose from './index';
import 'mongoose-geojson-schema';
import { Point } from 'geojson';

import { Document } from 'mongoose';

export type Stop = {
  _id: mongoose.Types.ObjectId;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: StopProperties;
} & GeoJSON.Feature<Point>;

type StopProperties = {
  name: string;
  label?: string;
  description?: string;
  upvotes?: {
    type: number;
    default: 0;
  };
  downvotes?: {
    type: number;
    default: 0;
  };
  tripDay?: {
    type: number;
    default: -1;
  };
};

export type StopCollection = {
  type: 'FeatureCollection';
  features: Stop[];
};

export type StopDocument = Stop & Document;

export const stopSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Feature'],
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number, Number],
      required: true,
    },
  },
  properties: {
    name: String,
    label: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
    tripDay: Number,
  },
});

export default mongoose.model<StopDocument>('Stop', stopSchema);
