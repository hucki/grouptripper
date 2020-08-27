import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { faComment, faComments } from '@fortawesome/free-regular-svg-icons';
import { useSinglePhoto } from '../hooks/usePhoto';
import { Trip } from './../types/Trip';
import axios from 'axios';

type TripCardProps = {
  trip: Trip;
  listView: boolean;
  inviteButton?: JSX.Element;
};

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

export default function TripCard({
  trip,
  listView,
  inviteButton,
}: TripCardProps): JSX.Element {
  const qureyString = trip.stopsCollection.features[0]
    ? trip.stopsCollection.features[0].properties.name
    : trip.name;
  const photo = useSinglePhoto({
    queryText: qureyString.replace(`’`, ''),
    dimensions: { width: 500, height: 500 },
  });
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const getDataAxios = async (): Promise<void> => {
      const { data: comments } = await axios.get(
        `${API_URL}/comments/${trip._id}`
      );
      setCommentsCount(comments.length);
    };
    getDataAxios();
  }, [trip._id]);

  const comments =
    commentsCount !== 0 ? (
      <>
        <FontAwesomeIcon
          icon={commentsCount === 1 ? faComment : faComments}
          className="mt-1 ml-2 text-gray-600"
        />
        <span className="ml-1 text-gray-600">{commentsCount}</span>
      </>
    ) : (
      <></>
    );
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
  const countryFlag = `https://www.countryflags.io/${trip.country}/flat/32.png`;
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
        <img
          src={countryFlag}
          className="absolute top-0 right-0 mt-4 mr-4 opacity-50"
          alt="Countryflag"
        />
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
            {comments}
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
