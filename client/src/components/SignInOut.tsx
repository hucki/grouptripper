import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignInOut: React.FC = () => {
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    isLoading,
    error,
    user,
  } = useAuth0();

  if (isLoading) return <button>Loading...</button>;
  if (error) return <div>Error: {error.message}</div>;
  if (isAuthenticated)
    return (
      <div className="flex flex-row">
        <button
          onClick={(): void => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
        <img
          className="object-contain w-12 h-12 mx-2 rounded-full shadow"
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
      <button onClick={(): Promise<void> => loginWithPopup()}>Sign in</button>
    );

  return <button>Sign in</button>;
};

export default SignInOut;
