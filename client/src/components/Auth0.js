import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

//eslint-disable-next-line
const Auth0 = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  if (isLoading) {
    return (
      <button
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
        style={{ transition: 'all .15s ease' }}
      >
        Loading..
      </button>
    );
  } else if (error) {
    return (
      <button
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
        style={{ transition: 'all .15s ease' }}
      >
        {error.message}
      </button>
    );
  } else if (isAuthenticated)
    return (
      <button
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
        style={{ transition: 'all .15s ease' }}
        onClick={() => logout({ returnTo: window.location.origin })} //eslint-disable-line
      >
        Log Out
      </button>
    );
  else
    return (
      <button
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
        style={{ transition: 'all .15s ease' }}
        onClick={() => loginWithRedirect()} //eslint-disable-line
      >
        Login / Signup
      </button>
    );
};

export default Auth0;
