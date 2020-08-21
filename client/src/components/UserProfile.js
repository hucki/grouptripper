import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import TripList from './TripList';

const UserProfile = () => {
  //eslint-disable-line
  const { logout, isAuthenticated, isLoading, error, user } = useAuth0();
  return (
    <div className="px-4 py-2 mb-4 mr-1">
      <button
        className="px-4 py-2 mb-4 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
        style={{ transition: 'all .15s ease' }}
        onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
      >
        Log Out
      </button>
      <div class="bg-white shadow p-4 rounded lg:w-64">
        <div class="text-center mt-4">
          <p class="text-gray-600 font-bold">
            {user.name ? user.name : 'Mohammed'}
          </p>
          <p class="text-sm font-hairline text-gray-600 mt-1">
            {user.email ? user.email : 'mohmed.ak.17@gmail.com'}
          </p>
        </div>
        <div class="flex justify-center mt-4">
          <img
            class="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full"
            src={
              user.picture
                ? user.picture
                : `https://source.unsplash.com/featured/100x100/?mohammed`
            }
            alt="user image"
          />
        </div>
      </div>
      <TripList />
    </div>
  );
};

export default UserProfile;
