import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignInOut: React.FC = () => {
  const {
    // loginWithRedirect,
    loginWithPopup,
    logout,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  if (isLoading) return <button>Loading...</button>;
  if (error) return <div>Error: {error.message}</div>;
  if (isAuthenticated)
    return (
      <button
        onClick={(): void => logout({ returnTo: window.location.origin })}
      >
        Log out
      </button>
    );
  if (!isAuthenticated)
    return (
      <button onClick={(): Promise<void> => loginWithPopup()}>Sign in</button>
    );

  return <button>Sign in</button>;
};

export default SignInOut;
