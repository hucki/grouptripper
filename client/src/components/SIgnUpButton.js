import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {//eslint-disable-line
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-teal-600 mt-4 mb-2 z-20"
      onClick={() =>//eslint-disable-line
        loginWithRedirect({
          screen_hint: 'signup', //eslint-disable-line
        })
      }
    >
      Sign Up For Free
    </button>
  );
};

export default SignupButton;
