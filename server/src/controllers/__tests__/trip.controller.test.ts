import mockingoose from 'mockingoose';
import mongoose from 'mongoose';
import * as tripController from './../trip.controller';
import Trip from './../../models/trip.model';

import faker from 'faker';
import dayjs from 'dayjs';

function buildTrip(): any {
  return {
    _id: mongoose.Types.ObjectId(),
    name: faker.lorem.words(),
    country: faker.address.country(),
    startDate: transformTimestampToDate(faker.date.future()),
    endDate: transformTimestampToDate(faker.date.future()),
    stops: [faker.address.city(), faker.address.city()],
  };
}

function transformTimestampToDate(timestamp: Date): Date {
  return new Date(dayjs().format('YYYY-MM-DD'));
}

function buildReq() {
  const req: any = {};
  return req;
}

function buildRes(overrides = {}) {
  const res: any = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
}

function jsonStrinigifyParse(item: any) {
  return JSON.parse(JSON.stringify(item));
}

test('getAllTrips returns all trips', async () => {
  const fakeTrips = [buildTrip(), buildTrip()];

  mockingoose(Trip).toReturn(fakeTrips, 'find');

  const req = buildReq();
  const res = buildRes();

  await tripController.getAllTrips(req, res);

  // We have to stringify and parse the mongoose object, otherwise we
  // get inconsistent formatting issues. And we can't use .toHaveBeenCalledWith
  // as that uses the whole mongoose object with all the extra mongoose function fields
  const responseJson = jsonStrinigifyParse(res.json.mock.calls[0][0]);
  expect(responseJson).toEqual(jsonStrinigifyParse(fakeTrips));
  expect(res.json).toHaveBeenCalledTimes(1);
});
