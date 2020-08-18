export type Trip = {
  _id?: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops: string[];
  details: GeoJSON.FeatureCollection;
};
