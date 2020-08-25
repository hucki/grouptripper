import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0 from './Auth0';
import SignInOut from './SignInOut';

const Navigation: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  return (
    <header className="text-gray-100 bg-gray-900">
      <div className="container flex items-center justify-between flex-shrink-0 p-4 mx-auto ">
        <Link to="/">
          <div className="text-3xl">Grouptripper</div>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            {isLoading || !isAuthenticated ? null : (
              <>
                <li>
                  <Link to="/user-profile">My trips</Link>
                </li>
                <li>
                  <Link to="/create-trip">Start a trip</Link>
                </li>
              </>
            )}
            <li>
              <SignInOut />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
