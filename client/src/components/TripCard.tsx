import React from 'react';
import dayjs from 'dayjs';

// import { usePhoto } from '../hooks/usePhoto';
// import { Stop } from './../types/Stop';
import { Trip } from './../types/Trip';


type TripCardProps = {
  trip: Trip;
};


export default function TripCard({ trip }: TripCardProps): JSX.Element {
  // const { trip } = props;

  // const photo = usePhoto({
  //   queryText: trip.country,
  //   dimensions: { width: 100, height: 100 },
  // });


export default function TripCard({ trip }: TripCardProps): JSX.Element {
  return (

    <div className="flex flex-col items-center justify-center max-w-sm mx-auto my-8">
      <div
        // style={photo ? { backgroundImage: `url(${photo.imgUrl})` } : {}}
        className="w-full h-48 bg-teal-300 bg-center bg-cover rounded-lg shadow-md"
      ></div>
      <div className="w-full ml-2 mr-2 -mt-16 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
          {trip.name}
        </div>
        <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
          <h1 className="font-bold text-gray-800 ">
            {dayjs(trip?.startDate).format('DD.MM.YYYY')} -
            {dayjs(trip?.endDate).format('DD.MM.YYYY')}
          </h1>
          {/* <button className="px-2 py-1 text-xs font-semibold text-white uppercase bg-gray-800 rounded hover:bg-gray-700">
            Add to cart
          </button> */}
        </div>
      </div>
    </div>

    // <div className="flex flex-row justify-center w-full mb-4 lg:max-w-full lg:flex">
    //   <div className="flex flex-col">
    //     <div className="flex flex-col justify-between p-4 leading-normal bg-white border border-teal-400 rounded-b lg:rounded-b-none lg:rounded-r">
    //       <div>
    //         <p className="flex items-center text-sm text-teal-600">
    //           <svg
    //             className="w-3 h-3 mr-2 text-teal-500 fill-current"
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 20 20"
    //           >
    //             <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
    //           </svg>
    //           <span>Planning finished</span>
    //         </p>
    //         <div className="flex flex-row justify-center">
    //           <div
    //             className="flex flex-wrap flex-shrink-0 m-4"
    //             style={{ height: '100px', width: '100px' }}
    //           >
    //             <img
    //               src={`https://source.unsplash.com/featured/100x100/?${trip?.details.features[0].properties.name}`}
    //               alt="..."
    //               className="h-auto max-w-full align-middle border-none rounded-full shadow-lg"
    //             />
    //           </div>
    //           <div className="flex flex-col">
    //             <h3 className="mb-2 text-4xl font-bold text-teal-900">
    //               {trip.name}
    //             </h3>
    //             <div className="flex items-center">
    //               <div className="text-sm">
    //                 <p className="font-bold leading-none text-teal-900">
    //                   {dayjs(trip?.startDate).format('DD.MM.YYYY')} -{' '}
    //                   {dayjs(trip?.endDate).format('DD.MM.YYYY')}
    //                 </p>
    //               </div>
    //             </div>
    //             <p className="text-base text-teal-700">
    //               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //               Voluptatibus quia, nulla! Maiores et perferendis eaque,
    //               exercitationem praesentium nihil.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
