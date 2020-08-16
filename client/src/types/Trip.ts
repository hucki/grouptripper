export type Trip = {
  _id?: string;
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops: string[];
};

export type TripOverrides = {
  _id?: Trip['_id'];
  name?: Trip['name'];
  country?: Trip['country'];
  startDate?: Trip['startDate'];
  endDate?: Trip['endDate'];
  stops?: Trip['stops'];
};
