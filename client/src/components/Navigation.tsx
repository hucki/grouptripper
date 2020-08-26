import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SignInOut from './SignInOut';
import logo from '../assets/groupglobe.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between p-2 bg-gray-900 md:p-4 lg:p-6">
      <Link to="/">
        <div className="flex items-center justify-between flex-shrink-0 mr-6 text-gray-100">
          <img
            src={logo}
            width="55px"
            className="mx-2"
            alt="grouptripper logo"
          />
          <span className="text-xl font-semibold tracking-tight">
            Grouptripper
          </span>
        </div>
      </Link>
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 text-gray-100 rounded">
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl"
            onClick={(): void => setMenuOpen(!menuOpen)}
          />
        </button>
      </div>
      <div
        className={`flex-grow ${
          !menuOpen ? 'hidden' : null
        } w-full text-gray-100 md:flex md:items-center md:w-auto`}
      >
        <div className="text-sm text-right md:flex-grow">
          <RestrictedLinks />
          <div className="block mt-4 mr-4 md:inline-block md:mt-0">
            <SignInOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

const RestrictedLinks: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <div className="block mt-4 mr-4 md:inline-block md:mt-0">
        <Link to="/user-profile">My trips</Link>
      </div>
      <div className="block mt-4 mr-4 md:inline-block md:mt-0">
        <Link to="/create-trip">Start a trip</Link>
      </div>
    </>
  );
};

export default Navigation;
