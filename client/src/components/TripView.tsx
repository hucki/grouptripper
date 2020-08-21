import React from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import TripCard from './TripCard';
import StopCard from './StopCard';
import { Stop } from '../types/Stop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTrip } from '../hooks/trips';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex items-center justify-center w-full mx-auto">
        <div className="flex flex-col w-full p-4">
          {trip?.stopsCollection.features.map((stop: Stop, index) => (
            // <StopListItem key={index} stop={stop} />
            <StopCard
              key={index}
              stop={stop}
              setEditStop={(): void => console.log('clicked', index)}
              editStop={''}
              tripEdit={false}
            />
          ))}
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
