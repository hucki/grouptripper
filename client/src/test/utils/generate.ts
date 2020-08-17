import faker from 'faker';
import dayjs from 'dayjs';

import { Trip } from '../../types/Trip';

function buildTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    _id: faker.random.uuid(),
    name: faker.lorem.words(),
    country: faker.address.country(),
    startDate: transformTimestampToDate(faker.date.future()),
    endDate: transformTimestampToDate(faker.date.future()),
    stops: [faker.address.city(), faker.address.city()],
    details: {
      type: 'FeatureCollection',
      features: [faker.address.city(), faker.address.city()].map((stop) => {
        return {
          type: 'Feature',
          properties: {
            stopId: faker.random.uuid(),
            name: stop,
          },
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(faker.address.latitude()),
              parseFloat(faker.address.longitude()),
            ],
          },
        };
      }),
    },
    ...overrides,
  };
}

function transformTimestampToDate(timestamp: Date): Date {
  return new Date(dayjs().format('YYYY-MM-DD'));
}

export { buildTrip };
