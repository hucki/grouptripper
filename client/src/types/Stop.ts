import { Point } from 'geojson';

export type StopCollection = GeoJSON.FeatureCollection<Point, StopProperties>;

export type Stop = { _id?: string } & GeoJSON.Feature<Point, StopProperties>;

type StopProperties = {
  name: string;
  label: string;
  description?: string;
  upvotes?: number;
  downvotes?: number;
  tripDay?: number;
};
