import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SignInOut from './SignInOut';

const Navigation: React.FC = () => {
  return (
    <header className="text-gray-100 bg-gray-900">
      <div className="container flex items-center justify-between flex-shrink-0 p-4 mx-auto ">
        <Link to="/">
          <div className="text-3xl">Grouptripper</div>
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <RestrictedLinks />
            <li>
              <SignInOut />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const RestrictedLinks: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <li>
        <Link to="/user-profile">My trips</Link>
      </li>
      <li>
        <Link to="/create-trip">Start a trip</Link>
      </li>
    </>
  );
};

export default Navigation;
