import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Auth0 from './Auth0';

export default function Navigation(): JSX.Element {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="flex flex-row justify-between p-6 align-middle">
      <h1 className="text-3xl text-teal-700 uppercase">Group Tripper</h1>
      <nav>
        <ul className="flex flex-row space-x-6">
          <li>
            <Link to="/">
              <div
                className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none hover:bg-teal-800"
                style={{ transition: 'all .15s ease' }}
              >
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link to="/create-trip">
              <div
                className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none hover:bg-teal-800"
                style={{ transition: 'all .15s ease' }}
              >
                Create Trip
              </div>
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/user-profile">
                <div
                  className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none hover:bg-teal-800"
                  style={{ transition: 'all .15s ease' }}
                >
                  Profile
                </div>
              </Link>
            </li>
          ) : (
            '' // <Auth0 />
          )}
          <li>{!isAuthenticated && <Auth0 />}</li>
        </ul>
      </nav>
    </header>
  );
}
