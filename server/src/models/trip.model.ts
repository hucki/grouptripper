import mongoose from './index';
import 'mongoose-geojson-schema';
import GeoJSON from 'geojson';

import { Document } from 'mongoose';

export type Trip = {
  _id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops?: string[];
  details?: GeoJSON.FeatureCollection;
};

export type Stop = {
  _id: mongoose.Types.ObjectId;
  type: string;
  geometry: {
    type: string;
    coordinates: [number];
  };
  properties: {
    name: string;
    description: string;
    upvotes: number;
    downvotes: number;
  };
};

export type TripDocument = Trip & Document;

const stopSchema = new mongoose.Schema({
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
    description: String,
    upvotes: Number,
    downvotes: Number,
  },
});

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
