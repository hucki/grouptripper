import React from 'react';
import dayjs from 'dayjs';
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
  const photo = usePhoto({
    queryText: trip.stopsCollection.features[0].properties.name,
    dimensions: { width: 300, height: 300 },
  });

  return (
    <div className="flex items-center flex-1 p-1 transition duration-500 ease-in-out transform rounded-lg shadow cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between leading-normal rounded-b lg:rounded-b-none lg:rounded-r">
          <div>
            <div
              className={
                listView
                  ? 'flex flex-col justify-center'
                  : 'flex flex-row justify-center'
              }
            >
              <div
                className="flex flex-wrap flex-shrink-0 m-4"
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
                <h3 className="mb-2 text-2xl font-bold text-teal-900">
                  {trip.name}
                </h3>
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="font-bold leading-none text-teal-900">
                      {dayjs(trip?.startDate).format('DD.MM.YYYY')} -{' '}
                      {dayjs(trip?.endDate).format('DD.MM.YYYY')}
                    </p>
                  </div>
                </div>
                <p className="text-base text-teal-700">
                  Yeah! We are having a trip. Prepare to be happy!{' '}
                  <span role="img" aria-label="Party Popper">
                    🎉
                  </span>
                </p>
                <p className="mt-4">
                  {trip?.stopsCollection.features.map((stop, index: number) => (
                    <span
                      key={stop.properties.name}
                      className="p-1 m-2 text-sm leading-none text-teal-900 bg-teal-200 rounded-md"
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
