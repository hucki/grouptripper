import React from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
// import { Stop } from '../types/Stop';
import { useParams, Link } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';
import TripCard from './TripCard';
// import StopCard from './StopCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useAuth0 } from '@auth0/auth0-react';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Draggable from './Draggable';

export default function TripEdit(): JSX.Element {
  // const [editStop, setEditStop] = useState('');
  // const [serverError, setServerError] = useState('');
  // const [redirect, setRedirect] = useState(false);
  // const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  // const { isLoading, error, trip } = useTrip(id);
  const { isLoading, error, data: trip } = useQuery('trip', () =>
    client<Trip>(`trips/${id}`)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (!trip) return <div>No trip found</div>;

  // const Timeline = (): JSX.Element => {
  //   return (
  //     <div className="container flex items-center justify-center w-full mx-auto">
  //       <div className="flex flex-col w-full p-4">
  //         {trip?.stopsCollection.features.map((stop: Stop, index) => (
  //           // <StopListItem key={index} stop={stop} />
  //           <StopCard
  //             key={index}
  //             stop={stop}
  //             setEditStop={setEditStop}
  //             editStop={editStop}
  //             tripEdit={true}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      {trip && <TripCard trip={trip} listView={false} key={trip.name} />}
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 my-4 md:grid-rows-1 md:grid-cols-2">
        {/* {trip && <Timeline />} */}
        <Draggable />
        {trip && <MapContainer trip={trip} />}
      </div>
      <Link to={`/trips/${id}`}>
        <div
          className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
          style={{ transition: 'all .15s ease' }}
        >
          <FontAwesomeIcon icon={faSave} />
          &nbsp; Save &amp; Go Back
        </div>
      </Link>
    </>
  );
}
