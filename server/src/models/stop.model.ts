import mongoose from './index';
import 'mongoose-geojson-schema';

import { Document } from 'mongoose';

export type Stop = {
  _id: mongoose.Types.ObjectId;
  type: string;
  geometry: {
    type: string;
    coordinates: [number];
  };
  properties: {
    name: string;
    label: string;
    description: string;
    upvotes: {
      type: number;
      default: 0;
    };
    downvotes: {
      type: number;
      default: 0;
    };
  };
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
      type: [Number],
      required: true,
    },
  },
  properties: {
    name: String,
    label: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
  },
});

export default mongoose.model<StopDocument>('Stop', stopSchema);
