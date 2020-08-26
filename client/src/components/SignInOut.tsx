import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './LoadingSpinner.css';

const SignInOut: React.FC = () => {
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    isLoading,
    error,
    user,
  } = useAuth0();

  if (isLoading)
    return (
      <button>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </button>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (isAuthenticated)
    return (
      <div className="flex flex-row justify-end space-x-8 text-lg ">
        <button
          onClick={(): void => logout({ returnTo: window.location.origin })}
        >
          <span className="mr-2">Log out</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <img
          className="hidden object-contain w-12 h-12 mx-2 border-2 border-gray-600 rounded-full md:block"
          src={
            user
              ? user.picture
              : `https://source.unsplash.com/featured/100x100/?portrait`
          }
          alt="user"
        />
      </div>
    );
  if (!isAuthenticated)
    return (
      <button
        onClick={(): Promise<void> => loginWithPopup()}
        className="text-lg"
      >
        {' '}
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Sign in
      </button>
    );

  return (
    <button className="text-lg">
      <FontAwesomeIcon icon={faSignInAlt} />
      Sign in
    </button>
  );
};

export default SignInOut;
