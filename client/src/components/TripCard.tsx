import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { usePhoto } from '../hooks/usePhoto';
import { Trip } from './../types/Trip';

type TripCardProps = {
  trip: Trip;
  listView: boolean;
  inviteButton?: JSX.Element;
};

export default function TripCard({
  trip,
  listView,
  inviteButton,
}: TripCardProps): JSX.Element {
  const qureyString = trip.stopsCollection.features[0]
    ? trip.stopsCollection.features[0].properties.name
    : trip.name;
  const photo = usePhoto({
    queryText: qureyString.replace(`’`, ''),
    dimensions: { width: 300, height: 300 },
  });

  const invitePending = trip?.invitedEmails?.length ? (
    <>
      <FontAwesomeIcon
        icon={faUserClock}
        className="mt-1 ml-2 text-orange-600"
      />
      <span className="ml-1 text-orange-600">
        {trip?.invitedEmails?.length}
      </span>
    </>
  ) : (
    <></>
  );

  const participants = trip?.participants?.length ? (
    <>
      <FontAwesomeIcon
        icon={faUserFriends}
        className="mt-1 ml-2 text-green-600"
      />
      <span className="ml-1 text-green-600">{trip?.participants?.length}</span>
    </>
  ) : (
    <></>
  );

  return (
    <div className="overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-lg shadow cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 pb-2/3">
        {inviteButton ? inviteButton : null}
        {photo ? (
          <img
            src={photo.imgUrl}
            alt={photo.altDescription}
            className="absolute object-cover w-full h-full"
          />
        ) : null}
      </div>
      <div className="p-2">
        <h4 className="mt-1 text-xl font-semibold leading-tight uppercase truncate text-secondary">
          {' '}
          {trip.name}
        </h4>
        <div className="flex items-baseline">
          <div className="text-xs font-semibold tracking-wide uppercase">
            <span className="font-bold leading-none text-secondary">
              {dayjs(trip?.startDate).format('DD.MM.YYYY')} -{' '}
              {dayjs(trip?.endDate).format('DD.MM.YYYY')}
            </span>
            {participants}
            {invitePending}
          </div>
        </div>

        <p className="mt-2">
          {trip?.stopsCollection.features.map((stop, index: number) => (
            <span
              key={stop.properties.name}
              className="inline-block px-2 m-1 text-xs font-semibold tracking-wide bg-yellow-300 rounded-full text-secondary"
            >
              {stop.properties.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
