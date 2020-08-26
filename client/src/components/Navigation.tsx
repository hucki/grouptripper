import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SignInOut from './SignInOut';
import logo from '../assets/groupglobe.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faMap } from '@fortawesome/free-regular-svg-icons';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="text-gray-100 bg-gray-900">
      <nav className="container flex flex-wrap items-center justify-between flex-shrink-0 p-4 mx-auto lg:p-6 ">
        <Link to="/">
          <div className="flex items-center justify-between flex-shrink-0 mr-6 text-gray-100">
            <img
              src={logo}
              width="55px"
              className="mx-2"
              alt="grouptripper logo"
            />
            <span className="text-2xl font-semibold tracking-tight">
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
    </header>
  );
};

const RestrictedLinks: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading || !isAuthenticated) return null;

  return (
    <>
      <div className="block mt-4 mr-6 text-lg md:inline-block md:mt-0 hover:text-yellow-500">
        <Link to="/user-profile">
          <FontAwesomeIcon icon={faCompass} className="mx-2" />
          My trips
        </Link>
      </div>
      <div className="block mt-4 mr-6 text-lg md:inline-block md:mt-0 hover:text-yellow-500">
        <Link to="/create-trip">
          <FontAwesomeIcon icon={faMap} className="mx-2" />
          <span className="">Plan a trip</span>
        </Link>
      </div>
    </>
  );
};

export default Navigation;
