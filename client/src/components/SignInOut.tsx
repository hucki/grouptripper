import React from 'react';
import Popup from 'reactjs-popup';
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
      <div className="flex flex-row justify-end space-x-8 text-lg hover:text-yellow-500">
        <button
          onClick={(): void => logout({ returnTo: window.location.origin })}
          className="block bg-gray-900 md:hidden"
        >
          <span className="mr-2">Log out</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <Popup
          trigger={
            <img
              className="hidden object-contain w-12 h-12 mx-2 border-2 border-gray-600 rounded-full cursor-pointer md:block"
              src={
                user
                  ? user.picture
                  : `https://source.unsplash.com/featured/100x100/?portrait`
              }
              alt="user"
            />
          }
          position="bottom right"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          arrow={false}
          contentStyle={{
            position: 'absolute',
            width: '200px',
            background: 'rgba(26, 32, 44, var(--bg-opacity))',
            border: 'none',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 15px',
            padding: '5px',
          }}
        >
          <button
            onClick={(): void => logout({ returnTo: window.location.origin })}
            className="bg-gray-900"
          >
            <span className="mr-2">Log out</span>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </Popup>
      </div>
    );
  if (!isAuthenticated)
    return (
      <button
        onClick={(): Promise<void> => loginWithPopup()}
        className="text-lg hover:text-yellow-500"
      >
        {' '}
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Sign in
      </button>
    );

  return (
    <button className="text-lg hover:text-yellow-500">
      <FontAwesomeIcon icon={faSignInAlt} />
      Sign in
    </button>
  );
};

export default SignInOut;
