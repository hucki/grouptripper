import React from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTrip } from '../hooks/trips';
import dayjs, { Dayjs } from 'dayjs';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);
  const numberOfDays =
    dayjs(trip?.endDate).diff(dayjs(trip?.startDate), 'd') + 1;

  const daysOfTrip: Dayjs[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    daysOfTrip.push(
      dayjs(trip?.startDate)
        .add(i, 'd')
        .set('second', 0)
        .set('minute', 1)
        .set('hour', 0)
    );
  }
  console.log(daysOfTrip);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex items-center justify-center w-full mx-auto">
        <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
          {daysOfTrip &&
            daysOfTrip.map((day: Dayjs) => (
              <div key={day.format('YYYYMMDD')} className="">
                {day.format('YYYYMMDD')}
              </div>
            ))}
          {/* {trip?.stopsCollection.features.map((stop: Stop, index) => (
            // <StopListItem key={index} stop={stop} />
            <StopCard
              key={index}
              stop={stop}
              setEditStop={(): void => console.log('clicked', index)}
              editStop={''}
              tripEdit={false}
            />
          ))} */}
        </div>
      </div>
    );
  };

  return (
    <>
      {trip && <TripCard trip={trip} listView={false} />}
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 m-4 md:grid-rows-1 md:grid-cols-2">
        <Timeline />
        {trip && <MapContainer trip={trip} />}
      </div>
      <Link to={`/trips/edit/${id}`}>
        <div
          className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
          style={{ transition: 'all .15s ease' }}
        >
          <FontAwesomeIcon icon={faEdit} />
          &nbsp; Edit this Trip
        </div>
      </Link>
    </>
  );
}
