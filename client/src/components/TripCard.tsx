import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { usePhoto } from '../hooks/usePhoto';
import { Trip } from './../types/Trip';

type TripCardProps = {
  trip: Trip;
  listView: boolean;
};

export default function TripCard({
  trip,
  listView,
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
      <FontAwesomeIcon icon={faUserClock} className="mt-1 ml-2 text-primary" />
      <span className="ml-1 text-primary">{trip?.invitedEmails?.length}</span>
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
    <div className="flex items-center flex-1 p-1 transition duration-500 ease-in-out transform rounded-lg shadow cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between leading-normal rounded-b lg:rounded-b-none lg:rounded-r">
          <div className="">
            <div
              className={
                listView
                  ? 'flex flex-col justify-center'
                  : 'flex flex-row justify-center'
              }
            >
              <div
                className="relative flex flex-wrap flex-shrink-0 m-4"
                style={listView ? {} : { height: '100px', width: '100px' }}
              >
                {photo ? (
                  <img
                    src={photo.imgUrl}
                    alt={photo.altDescription}
                    className="h-auto max-w-full align-middle border-none shadow-lg"
                  />
                ) : null}
              </div>
              <div className="flex flex-col p-2">
                <h3 className="mb-2 text-2xl font-bold text-yellow-900">
                  {trip.name}
                </h3>
                <div className="flex flex-col">
                  <div className="text-sm">
                    <span className="font-bold leading-none text-yellow-900">
                      {dayjs(trip?.startDate).format('DD.MM.YYYY')} -{' '}
                      {dayjs(trip?.endDate).format('DD.MM.YYYY')}
                    </span>
                    {participants}
                    {invitePending}
                  </div>
                </div>
                <p className="mt-4">
                  {trip?.stopsCollection.features.map((stop, index: number) => (
                    <span
                      key={stop.properties.name}
                      className="p-2 m-2 text-xs leading-none rounded-full text-secondary bg-primary"
                    >
                      {stop.properties.name}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
