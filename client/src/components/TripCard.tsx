import React from 'react';
import dayjs from 'dayjs';
// import { usePhoto } from '../hooks/usePhoto';
import { Trip } from './../types/Trip';

type TripCardProps = {
  trip: Trip;
};

export default function TripCard({ trip }: TripCardProps): JSX.Element {
  // const photo = usePhoto({
  //   queryText: trip.country,
  //   dimensions: { width: 100, height: 100 },
  // });

  return (
    // <div className="flex flex-col items-center justify-center max-w-sm mx-auto my-8">
    //   <div
    //     style={{
    //       backgroundImage: `url(https://source.unsplash.com/featured/200x200/?${trip?.country})`,
    //     }}
    //     className="w-full h-48 bg-teal-300 bg-center bg-cover rounded-lg shadow-md"
    //   ></div>
    //   <div className="w-full ml-2 mr-2 -mt-16 overflow-hidden bg-white rounded-lg shadow-lg">
    //     <div className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
    //       {trip.name}
    //     </div>
    //     <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
    //       <h1 className="font-bold text-gray-800 ">
    //         {dayjs(trip?.startDate).format('DD.MM.YYYY')} -
    //         {dayjs(trip?.endDate).format('DD.MM.YYYY')}
    //       </h1>
    //       {/* <button className="px-2 py-1 text-xs font-semibold text-white uppercase bg-gray-800 rounded hover:bg-gray-700">
    //         Add to cart
    //       </button> */}
    //     </div>
    //   </div>
    // </div>

    <div className="flex items-center flex-1 p-1 transition duration-500 ease-in-out transform bg-gray-100 rounded-md cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-col justify-between leading-normal bg-white rounded-b lg:rounded-b-none lg:rounded-r">
          <div>
            <div className="flex flex-col justify-center">
              <div
                className="flex flex-wrap flex-shrink-0 m-4"
                // style={{ height: '100px', width: '100px' }}
              >
                <img
                  src={`https://source.unsplash.com/featured/500x500/?${trip?.country}`}
                  alt="..."
                  className="h-auto max-w-full align-middle border-none shadow-lg"
                />
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
                  Yeah! We are going to:
                  {trip?.stopsCollection.features.map((stop, index: number) => (
                    <span className="font-bold leading-none text-teal-900">
                      &nbsp;{stop.properties.name}
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
