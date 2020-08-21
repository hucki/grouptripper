import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import TripList from './TripList';

//eslint-disable-next-line
const UserProfile = () => {
  const { logout, user } = useAuth0();
  return (
    <div className="px-4 py-2 mb-4 mr-1 ">
      <div class="bg-white shadow p-4 rounded">
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
            class="shadow sm:w-12 sm:h-12 w-20 h-20 rounded-full object-contain h-48 w-full"
            src={
              user.picture
                ? user.picture
                : `https://source.unsplash.com/featured/100x100/?mohammed`
            }
            alt="user"
          />
        </div>
        <div class="flex justify-center mt-4">
          <button
            className="flex text-center justify-center shadow border-teal-500 border-2 rounded-full px-4 py-2 text-xl text-teal-500 uppercase hover:bg-red-500 hover:text-white"
            style={{ transition: 'all .15s ease' }}
            onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
          >
            Log Out
          </button>
        </div>
      </div>
      <TripList />
    </div>
  );
};

export default withAuthenticationRequired(UserProfile, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
