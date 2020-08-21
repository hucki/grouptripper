import React from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHotel } from '@fortawesome/free-solid-svg-icons';
import { useTrip } from '../hooks/trips';
import dayjs, { Dayjs } from 'dayjs';
import { Stop } from '../types/Stop';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);
  const numberOfDays =
    dayjs(trip?.endDate).diff(dayjs(trip?.startDate), 'd') + 1;

  const daysOfTrip: Dayjs[] = [];
  const stopsOfAllDays: JSX.Element[][] = [];
  const notScheduled: JSX.Element[] = [];

  type TimelineItemInputProps = {
    stop: Stop;
  };
  const TimelineItem = ({ stop }: TimelineItemInputProps): JSX.Element => {
    return (
      <div className="flex flex-row mb-2 ml-8 border rounded even:even:bg-gray-100">
        <div className="-ml-8">
          <FontAwesomeIcon className="text-teal-500" icon={faHotel} />{' '}
        </div>
        <div className="ml-5">
          <div className="text-sm font-semibold uppercase">
            {stop.properties.name}
          </div>
          <div className="text-xs">{stop.properties.label}</div>
          <div className="text-xs">{stop.properties.description}</div>
        </div>
      </div>
    );
  };

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex items-center justify-center w-full mx-auto">
        <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
          {notScheduled.length ? (
            <div>
              <span className="text-sm italic text-gray-400 lowercase">
                not yet scheduled:
              </span>
              {notScheduled}
            </div>
          ) : null}
          {daysOfTrip &&
            daysOfTrip.map((day: Dayjs, index) => (
              <div key={day.format('YYYYMMDD')} className="uppercase ">
                {day.format('dddd D')}
                {stopsOfAllDays[index] ? (
                  stopsOfAllDays[index]
                ) : (
                  <div className="text-sm italic text-gray-400 lowercase">
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

  trip?.stopsCollection.features.map((stop: Stop) => {
    if (stop.properties.tripDay === -1) {
      notScheduled.push(<TimelineItem key={stop._id} stop={stop} />);
    } else {
      return null;
    }
  });
  for (let i = 0; i < numberOfDays; i++) {
    stopsOfAllDays.push([]);
    trip?.stopsCollection.features.map((stop: Stop, index) => {
      if (i === stop.properties.tripDay) {
        stopsOfAllDays[i].push(<TimelineItem key={stop._id} stop={stop} />);
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
