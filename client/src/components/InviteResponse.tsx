import React from 'react';
import { useInviteResponse } from '../hooks/trips';
import { Trip } from '../types/Trip';

export default function InviteResponse({
  tripId,
}: {
  tripId: string;
}): JSX.Element {
  const [accept] = useInviteResponse(tripId, 'accept');
  const [reject] = useInviteResponse(tripId, 'reject');
  return (
    <div className="absolute z-30 m-4">
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-gray-900 uppercase bg-yellow-500 rounded shadow outline-none active:bg-yellow-600 hover:shadow-lg focus:outline-none"
        onClick={(): Promise<Trip> => accept()}
      >
        Accept
      </button>
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-gray-900 uppercase bg-gray-500 rounded shadow outline-none active:bg-yellow-600 hover:shadow-lg focus:outline-none"
        onClick={(): Promise<Trip> => reject()}
      >
        Reject
      </button>
    </div>
  );
}
