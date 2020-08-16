import mongoose from 'mongoose';

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

export { buildReq, buildRes, buildTrip };
