import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TripList from './TripList';
import { useTrips, useInvitedTrips } from '../hooks/trips';

export default function UserProfile(): JSX.Element {
  const { logout, user } = useAuth0();
  return (
    <div className="px-4 py-2 mb-4 mr-1 ">
      <div className="p-4 bg-white rounded shadow">
        <div className="mt-4 text-center">
          <p className="font-bold text-gray-600">{user ? user.name : ''}</p>
          <p className="mt-1 text-sm font-hairline text-gray-600">
            {user ? user.email : ''}
          </p>
        </div>
        <div className="flex justify-center mt-4">
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
        <div className="flex justify-center mt-4">
          <button
            className="flex justify-center px-4 py-2 text-xl text-center text-teal-500 uppercase border-2 border-teal-500 rounded-full shadow hover:bg-red-500 hover:text-white"
            style={{ transition: 'all .15s ease' }}
            onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
          >
            Log Out
          </button>
        </div>
      </div>
      <UpcomingTrips />
      <InvitedTrips />
    </div>
  );
}

function UpcomingTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-2xl font-bold text-teal-900">UpcomingTrips</h3>
      <TripList trips={trips} />
    </div>
  );
}

function InvitedTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useInvitedTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-2xl font-bold text-teal-900">Invites Waiting</h3>
      <TripList trips={trips} />
    </div>
  );
}
