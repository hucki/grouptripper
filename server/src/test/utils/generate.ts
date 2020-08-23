import mongoose from 'mongoose';
import { Trip } from '../../models/trip.model';

import faker from 'faker';
import dayjs from 'dayjs';
import { Stop } from '../../models/stop.model';

function buildStop(): Stop {
  return {
    _id: mongoose.Types.ObjectId(),
    type: 'Feature',
    properties: {
      name: faker.address.city(),
      label: faker.address.city(),
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(faker.address.latitude()),
        parseFloat(faker.address.longitude()),
      ],
    },
  };
}

function buildTrip(): Trip {
  return {
    _id: mongoose.Types.ObjectId(),
    name: faker.lorem.words(),
    country: faker.address.country(),
    startDate: transformTimestampToDate(faker.date.future()),
    endDate: transformTimestampToDate(faker.date.future()),
    stops: [faker.address.city(), faker.address.city()],
    stopsCollection: {
      type: 'FeatureCollection',
      features: [buildStop(), buildStop()],
    },
    ownerId: faker.random.uuid(),
    invitedEmails: [],
  };
}

function transformTimestampToDate(timestamp: Date): Date {
  return new Date(dayjs(timestamp).format('YYYY-MM-DD'));
}

function buildReq(overrides = {}) {
  const req: any = {
    body: {},
    params: {},
    ...overrides,
  };
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

function buildNext(impl?: (...args: any[]) => unknown) {
  return jest.fn(impl).mockName('next');
}

export { buildReq, buildRes, buildNext, buildTrip };
