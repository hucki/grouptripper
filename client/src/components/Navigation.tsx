import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  return (
    <header className="flex flex-row justify-between p-6 align-middle">
      <h1 className="text-xl text-red-800">Group Tripper</h1>
      <nav>
        <ul className="flex flex-row space-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-trip">Create Trip</Link>
          </li>
          <li>
            <Link to="/trip/1">Your current Trip</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
