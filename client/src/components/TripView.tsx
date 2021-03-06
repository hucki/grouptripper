import React, { useMemo, useCallback } from 'react';
import MapContainer from './MapContainer';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useTrip, useParticipants } from '../hooks/trips';
import dayjs, { Dayjs } from 'dayjs';
import { Stop } from '../types/Stop';
import TimelineHeader from './TimelineHeader';
import TimelineItem from './TimelineItem';
import Invite from './Invite';
import TripComments from './TripComments';
import TripImages from './TripImages/TripImages';
import { getName } from 'country-list';
import { Trip } from './../types/Trip';
import HeroImageWithText from './HeroImageWithText';

const TripView: React.FC = () => {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error.message}</div>;
  if (!trip) return null;

  return <MainTripView trip={trip} />;
};

export default TripView;

const MainTripView: React.FC<{ trip: Trip }> = ({ trip }) => {
  const countryName = getName(trip.country) || 'World';
  return (
    <main>
      <HeroImageWithText queryText={countryName} className="flex items-center">
        <h1 className="text-6xl font-semibold">{trip.name}</h1>
        <p>
          {dayjs(trip.startDate).format('dddd DD MMM YYYY')} to{' '}
          {dayjs(trip.endDate).format('dddd DD MMM YYYY')}
        </p>
      </HeroImageWithText>
      <div className="container grid grid-cols-1 row-gap-6 col-gap-6 p-4 mx-auto mt-4 lg:grid-cols-2">
        <section className="row-start-1 row-end-4 p-4 bg-white rounded">
          <div className="flex items-center space-x-4">
            <h2 className="mb-4 text-2xl">Your schedule</h2>
            <TripEditLink to={`/trips/edit/${trip._id}`} />
          </div>
          <Timeline trip={trip} />
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Trip route</h2>
          <div>{<MapContainer trip={trip} />}</div>
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Who's coming</h2>
          {trip._id && <TripParticipants tripId={trip._id} />}
          <Invite trip={trip} />
        </section>
        <section className="p-4 bg-white rounded">
          <h2 className="mb-4 text-2xl">Comments</h2>
          {trip._id && <TripComments tripId={trip._id} />}
        </section>
        <section className="col-start-1 p-4 bg-white rounded lg:col-end-3">
          <h2 className="mb-4 text-2xl">Photos of the trip</h2>
          <TripImages trip={trip} />
        </section>
      </div>
    </main>
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

const Timeline: React.FC<{ trip: Trip }> = ({ trip }) => {
  const unscheduledStops = trip.stopsCollection.features.filter(
    (stop) => stop.properties.tripDay === -1
  );

  const stopsForTripDay = useCallback(
    (tripDay) => {
      return trip.stopsCollection.features.filter(
        (stop) => stop.properties.tripDay === tripDay
      );
    },
    [trip.stopsCollection.features]
  );

  const daysOfTrip = useMemo(() => {
    const numberOfDays =
      dayjs(trip.endDate).diff(dayjs(trip.startDate), 'd') + 1;
    const result = [];
    for (let i = 0; i < numberOfDays; i++) {
      result.push(dayjs(trip.startDate).add(i, 'd'));
    }
    return result;
  }, [trip.startDate, trip.endDate]);

  return (
    <div className="container flex justify-center w-full mx-auto">
      <div className="flex flex-col w-full">
        {unscheduledStops.length ? (
          <div key="row-1">
            <TimelineHeader dayId={'-1'} key={'-1'} day={null} />
            {stopsForTripDay(-1).map((stop: Stop) => (
              <TimelineItem key={stop._id} stop={stop} editMode={false} />
            ))}
          </div>
        ) : null}
        {daysOfTrip.map((day: Dayjs, index) => (
          <div key={'row' + index}>
            <TimelineHeader
              key={day.format('YYYYMMDD')}
              dayId={index.toString()}
              day={day}
            />
            {stopsForTripDay(index).length ? (
              stopsForTripDay(index).map((stop: Stop) => (
                <TimelineItem key={stop._id} stop={stop} editMode={false} />
              ))
            ) : (
              <div
                key={'none' + index}
                className="ml-8 text-sm italic text-gray-400 lowercase"
              >
                {' '}
                Nothing planned
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TripEditLink: React.FC<{ to: string }> = ({ to }) => (
  <Link to={to} className="-mt-2 -mr-2 w-1/8">
    <div
      className="flex justify-center p-2 mr-1 text-xs font-bold uppercase bg-gray-300 rounded outline-none active:bg-gray-400 hover:shadow focus:outline-none"
      style={{ transition: 'all .15s ease' }}
    >
      <FontAwesomeIcon icon={faEdit} />
    </div>
  </Link>
);
