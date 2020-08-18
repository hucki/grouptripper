export type Trip = {
  _id?: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  details: GeoJSON.FeatureCollection;
};

export type Stop = {
  type: string;
  geometry: { type: string; coordinates: number[] };
  properties: { name: string; label: string };
};
