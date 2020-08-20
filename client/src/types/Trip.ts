import { StopCollection } from './Stop';

export type Trip = {
  _id?: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stopsCollection: StopCollection;
  details: StopCollection;
};
