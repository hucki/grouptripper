import React from 'react';
import { Trip } from '../types/Trip';
import { useInviteResponse } from '../hooks/trips';

export default function InviteResponse({
  tripId,
}: {
  tripId: string;
}): JSX.Element {
  const [accept] = useInviteResponse(tripId, 'accept');
  const [reject] = useInviteResponse(tripId, 'reject');
  return (
    <div>
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
        onClick={() => accept()}
      >
        Accept Invitation
      </button>
      <button
        type="button"
        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
        onClick={() => reject()}
      >
        Reject Invitation
      </button>
    </div>
  );
}
