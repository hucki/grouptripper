import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TripList from './TripList';
import { useTrips, useInvitedTrips } from '../hooks/trips';
import { Trip } from '../types/Trip';
import InviteResponse from './InviteResponse';
import TripCard from './TripCard';

export default function UserProfile(): JSX.Element {
  const { user } = useAuth0();
  return (
    <>
      <div className="px-4 py-2 mb-4 mr-1 ">
        <h3 className="mb-2 text-2xl font-bold text-teal-900">
          Welcome back{user ? `, ${user.name}` : null}!
        </h3>
        {/* <div className="rounded shadow-lg">
          <div className="flex flew-row">
            <div className="flex justify-center m-2">
              <img
                className="object-contain w-full h-48 rounded-full shadow sm:w-12 sm:h-12"
                src={
                  user
                    ? user.picture
                    : `https://source.unsplash.com/featured/100x100/?mohammed`
                }
                alt="user"
              />
            </div>
            <div className="m-2 text-center">
              <p className="font-bold text-gray-600">{user ? user.name : ''}</p>
              <p className="mt-1 text-sm font-hairline text-gray-600">
                {user ? user.email : ''}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
                style={{ transition: 'all .15s ease' }}
                onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
              >
                Log Out
              </button>
            </div>
          </div>
        </div> */}
        <InvitedTrips />
        <UpcomingTrips />
      </div>
    </>

    // <div className="px-4 py-2 mb-4 mr-1 ">
    //   <div className="p-4 bg-white rounded shadow">
    //     <div className="mt-4 text-center">
    //       <p className="font-bold text-gray-600">{user ? user.name : ''}</p>
    //       <p className="mt-1 text-sm font-hairline text-gray-600">
    //         {user ? user.email : ''}
    //       </p>
    //     </div>
    //     <div className="flex justify-center mt-4">
    //       <img
    //         className="object-contain w-full h-48 rounded-full shadow sm:w-12 sm:h-12"
    //         src={
    //           user
    //             ? user.picture
    //             : `https://source.unsplash.com/featured/100x100/?mohammed`
    //         }
    //         alt="user"
    //       />
    //     </div>
    //     <div className="flex justify-center mt-4">
    //       <button
    //         className="flex justify-center px-4 py-2 text-xl text-center text-teal-500 uppercase border-2 border-teal-500 rounded-full shadow hover:bg-red-500 hover:text-white"
    //         style={{ transition: 'all .15s ease' }}
    //         onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
    //       >
    //         Log Out
    //       </button>
    //     </div>
    //   </div>
    //   <UpcomingTrips />
    //   <InvitedTrips />
    // </div>
  );
}

function UpcomingTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div>
      <h4 className="mb-2 text-xl font-bold text-teal-900">
        Here are your upcoming Trips:
      </h4>
      <TripList key="ownTripList" trips={trips} />
    </div>
  );
}

function InvitedTripCard({ trip }: { trip: Trip }): JSX.Element {
  return (
    <>
      {trip._id ? (
        <TripCard
          key={trip._id + 'invite'}
          trip={trip}
          listView={true}
          inviteButton={<InviteResponse tripId={trip._id} />}
        />
      ) : null}
    </>
  );
}

function InvitedTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useInvitedTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div>
      <h4 className="mb-2 text-xl font-bold text-teal-900">
        Check this out! You have been invited to{' '}
        {trips.length === 1 ? 'this trip' : 'these trips'}:
      </h4>
      <TripList
        key="invitedTripList"
        trips={trips}
        renderTrip={InvitedTripCard}
      />
    </div>
  );
}
