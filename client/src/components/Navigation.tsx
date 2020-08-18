import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  return (
    <header className="flex flex-row justify-between p-6 align-middle">
      <h1 className="text-xl text-teal-500 uppercase">Group Tripper</h1>
      <nav>
        <ul className="flex flex-row space-x-6">
          <li>
            <Link to="/">
              <div
                className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                style={{ transition: 'all .15s ease' }}
              >
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link to="/create-trip">
              <div
                className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
                style={{ transition: 'all .15s ease' }}
              >
                Create Trip
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
