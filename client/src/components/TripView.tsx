import React from 'react';
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
import { getName } from 'country-list';
import { useSinglePhoto } from './../hooks/usePhoto';
import { Trip } from './../types/Trip';
import BackgroundShim from './BackgroundShim';

const TripView: React.FC = () => {
  const { id } = useParams();
  const { isLoading, error, trip } = useTrip(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error.message}</div>;
  if (!trip) return null;

  return (
    <>
      {<MainTripView trip={trip} />}
      <div className="container mx-auto">
        <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 my-4 md:grid-rows-1 md:grid-cols-2">
          <div>{<MapContainer trip={trip} />}</div>
        </div>
        <TripComments tripId={id} />
      </div>
    </>
  );
};

export default TripView;

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
      <div className="container mx-auto mt-4">
        <h2 className="mb-4 text-2xl">Who's coming</h2>
        {trip._id && <TripParticipants tripId={trip._id} />}
        <Invite trip={trip} />
        <h2 className="mb-4 text-2xl">Your schedule</h2>
        {<Timeline trip={trip} />}
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

const Timeline: React.FC<{ trip: Trip }> = ({ trip }) => {
  const daysOfTrip: Dayjs[] = [];
  const stopsOfAllDays: JSX.Element[][] = [];
  const notScheduled: JSX.Element[] = [];

  const numberOfDays =
    dayjs(trip?.endDate).diff(dayjs(trip?.startDate), 'd') + 1;

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

  return (
    <div className="container flex justify-center w-full mx-auto">
      <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow">
        <div key="rowHeader" className="flex flex-col">
          <Link
            to={`/trips/edit/${trip._id}`}
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
