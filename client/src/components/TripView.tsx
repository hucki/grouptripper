import React from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTrip } from '../hooks/trips';
import dayjs, { Dayjs } from 'dayjs';
import { Stop } from '../types/Stop';
import TimelineHeader from './TimelineHeader';
import TimelineItem from './TimelineItem';
import Invite from './Invite';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);
  const numberOfDays =
    dayjs(trip?.endDate).diff(dayjs(trip?.startDate), 'd') + 1;

  const daysOfTrip: Dayjs[] = [];
  const stopsOfAllDays: JSX.Element[][] = [];
  const notScheduled: JSX.Element[] = [];

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex justify-center w-full mx-auto">
        <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
          <div key="rowHeader" className="flex flex-col">
            <Link
              to={`/trips/edit/${id}`}
              className="-mt-2 -mr-2 w-1/8"
              style={{ alignSelf: 'flex-end' }}
            >
              <div
                className="flex justify-center p-2 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                style={{ transition: 'all .15s ease' }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
            </Link>
          </div>

          {notScheduled.length ? (
            <div key="row-1">
              <TimelineHeader dayId={'-1'} key={'-1'} />
              {notScheduled}
            </div>
          ) : null}
          {daysOfTrip &&
            daysOfTrip.map((day: Dayjs, index) => (
              <div key={'row' + index}>
                <TimelineHeader
                  key={day.format('YYYYMMDD')}
                  dayId={index.toString()}
                />
                {stopsOfAllDays[index].length ? (
                  stopsOfAllDays[index]
                ) : (
                  <div
                    key={'none' + index}
                    className="ml-8 text-sm italic text-gray-400 lowercase"
                  >
                    {' '}
                    no stops on this day
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  trip?.stopsCollection.features.map((stop: Stop, index) => {
    if (stop.properties.tripDay === -1) {
      notScheduled.push(
        <TimelineItem key={'-1' + index} stop={stop} editMode={false} />
      );
    } else {
      return null;
    }
  });
  for (let i = 0; i < numberOfDays; i++) {
    stopsOfAllDays.push([]);
    trip?.stopsCollection.features.map((stop: Stop, index) => {
      if (i === stop.properties.tripDay) {
        stopsOfAllDays[i].push(
          <TimelineItem key={stop._id} stop={stop} editMode={false} />
        );
      } else {
        return null;
      }
    });

    daysOfTrip.push(
      dayjs(trip?.startDate)
        .add(i, 'd')
        .set('second', 0)
        .set('minute', 1)
        .set('hour', 0)
    );
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  return (
    <>
      {trip && <TripCard trip={trip} listView={false} />}
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 my-4 md:grid-rows-1 md:grid-cols-2">
        <Timeline />
        <div>
          {trip && <MapContainer trip={trip} />}
          <div className="container flex items-center justify-center w-full mx-auto mt-4">
            <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
              <h3 className="mb-2 text-2xl font-bold text-teal-900">
                who is on board?
              </h3>
              {trip && <Invite trip={trip} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
