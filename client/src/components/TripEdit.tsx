import React from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useTrip, useParticipants } from '../hooks/trips';
import dayjs from 'dayjs';
import Invite from './Invite';
import { getName } from 'country-list';
import { useSinglePhoto } from '../hooks/usePhoto';
import { Trip } from '../types/Trip';
import { Stop } from '../types/Stop';
import BackgroundShim from './BackgroundShim';
import TripDragger from './TripDragger';
import AutoComplete from './AutoCompleteStandalone';
import { useCreateStop } from '../hooks/stops';

const TripEdit: React.FC = () => {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error.message}</div>;
  if (!trip) return null;

  return <MainTripView trip={trip} />;
};

export default TripEdit;

const MainTripView: React.FC<{ trip: Trip }> = ({ trip }) => {
  const countryName = getName(trip.country) || 'World';
  return (
    <main>
      <HeroImage queryText={countryName} className="flex items-center">
        <div className="container grid h-full p-4 mx-auto lg:grid-cols-3">
          <div className="self-center col-start-1 col-end-3 p-6 text-gray-100">
            <BackgroundShim>
              <h1 className="text-6xl font-semibold">{trip.name}</h1>
              <p>
                {dayjs(trip.startDate).format('dddd DD MMM YYYY')} to{' '}
                {dayjs(trip.endDate).format('dddd DD MMM YYYY')}
              </p>
            </BackgroundShim>
          </div>
        </div>
      </HeroImage>
      <div className="container grid grid-cols-1 row-gap-6 col-gap-6 p-4 mx-auto mt-4 lg:grid-cols-2">
        <section className="row-start-1 row-end-4 p-4 bg-white rounded">
          <div className="flex items-center space-x-4">
            <h2 className="mb-4 text-2xl">Your schedule</h2>
            <TripSaveLink to={`/trips/${trip._id}`} />
          </div>
          {trip._id && <TripDragger id={trip._id} trip={trip} />}
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Trip route</h2>
          <div>{<MapContainer trip={trip} />}</div>
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Add new stop</h2>
          {trip._id && (
            <StopInput tripId={trip._id} countryCode={trip.country} />
          )}
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Who's coming</h2>
          {trip._id && <TripParticipants tripId={trip._id} />}
          <Invite trip={trip} />
        </section>
      </div>
    </main>
  );
};

const HeroImage: React.FC<{ queryText: string; className?: string }> = ({
  queryText,
  className,
  children,
}) => {
  const photo = useSinglePhoto({ queryText });

  return (
    <div
      className={`${className} w-full bg-center bg-cover`}
      style={{ backgroundImage: `url(${photo.imgUrl})`, minHeight: '25vh' }}
    >
      {children}
    </div>
  );
};

const TripParticipants: React.FC<{ tripId: string }> = ({ tripId }) => {
  const { isLoading, error, participants } = useParticipants(tripId);
  if (isLoading) return null;
  if (error) return null;
  if (!participants) return null;

  return (
    <ul className="mb-6 space-y-2">
      {participants.map((participant) => (
        <li key={participant.id} className="flex items-center">
          <img
            src={participant.picture}
            alt=""
            className="w-6 h-6 mr-3 rounded-full"
          />
          <div>{participant.name}</div>
        </li>
      ))}
    </ul>
  );
};

const TripSaveLink: React.FC<{ to: string }> = ({ to }) => (
  <Link to={to} className="-mt-2 -mr-2 w-1/8">
    <div
      className="flex justify-center p-2 mr-1 text-xs font-bold uppercase bg-gray-300 rounded outline-none active:bg-gray-400 hover:shadow focus:outline-none"
      style={{ transition: 'all .15s ease' }}
    >
      <FontAwesomeIcon icon={faSave} />
    </div>
  </Link>
);

const StopInput: React.FC<{
  tripId: string;
  countryCode: string;
}> = ({ tripId, countryCode }) => {
  const [createStop] = useCreateStop(tripId);

  const enrichStop: (stop: Stop) => Stop = (stop) => {
    return { ...stop, tripDay: -1 };
  };

  const handleAddClick: (stop: Stop | null | undefined) => void = (stop) => {
    if (!stop) return;
    const enrichedStop = enrichStop(stop);
    createStop({ stop: enrichedStop });
  };

  return (
    <AutoComplete
      name="addNewStop"
      countryCode={countryCode}
      onAddClick={handleAddClick}
    />
  );
};
