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
    <div className="absolute z-30">
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
        onClick={(): Promise<Trip> => accept()}
      >
        Accept Invitation
      </button>
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
        onClick={(): Promise<Trip> => reject()}
      >
        Reject Invitation
      </button>
    </div>
  );
}
