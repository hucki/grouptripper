import mockingoose from 'mockingoose';
import mongoose, { Query } from 'mongoose';
import * as tripController from './../trip.controller';
import Trip, { ITrip } from './../../models/trip.model';
import { buildTrip, buildReq, buildRes } from '../../utils/generate';
import { jsonStrinigifyParse } from '../../utils/helpers';

beforeEach(() => {
  mockingoose.resetAll();
});

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
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status).toHaveBeenCalledTimes(1);
});

test('getOneTrip returns trip when given an id', async () => {
  const fakeTrip = buildTrip();

  const finderMock = (query: Query<ITrip>) => {
    if (query.getQuery()._id === fakeTrip._id) {
      return fakeTrip;
    }
  };

  mockingoose(Trip).toReturn(finderMock, 'findOne');

  const req = buildReq({ params: { id: fakeTrip._id } });
  const res = buildRes();

  await tripController.getOneTrip(req, res);

  const responseJson = jsonStrinigifyParse(res.json.mock.calls[0][0]);
  expect(responseJson).toEqual(jsonStrinigifyParse(fakeTrip));
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status).toHaveBeenCalledTimes(1);
});

test('getOneTrip returns 404 when id not found', async () => {
  const badId = mongoose.Types.ObjectId();

  mockingoose(Trip).toReturn(null, 'findOne');

  const req = buildReq({ params: { id: badId } });
  const res = buildRes();

  await tripController.getOneTrip(req, res);

  const responseJson = jsonStrinigifyParse(res.json.mock.calls[0][0]);
  expect(responseJson).toMatchInlineSnapshot(`
    Object {
      "message": "Trip not found",
    }
  `);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.status).toHaveBeenCalledTimes(1);
});

test('createTrip creates and returns a trip', async () => {
  const { _id, ...fakeTrip } = buildTrip();

  mockingoose(Trip).toReturn({ _id, ...fakeTrip }, 'save');

  const req = buildReq({ body: fakeTrip });
  const res = buildRes();

  await tripController.createTrip(req, res);

  const responseJson = jsonStrinigifyParse(res.json.mock.calls[0][0]);
  expect(responseJson).toEqual(jsonStrinigifyParse({ _id, ...fakeTrip }));
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.status).toHaveBeenCalledTimes(1);
});
