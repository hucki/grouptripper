import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TripList from './TripList';
import { useTrips, useInvitedTrips } from '../hooks/trips';
import { Trip } from '../types/Trip';
import InviteResponse from './InviteResponse';
import TripCard from './TripCard';
import HeroImageWithText from './HeroImageWithText';

export default function UserProfile(): JSX.Element {
  const imageSearchString = 'Travel';
  const { user } = useAuth0();
  return (
    <main>
      <HeroImageWithText
        queryText={imageSearchString}
        className="flex items-center"
      >
        <h1 className="text-3xl font-semibold md:text-4xl lg:text-6xl">
          {' '}
          Welcome back{user ? `, ${user.name}` : null}!
        </h1>
      </HeroImageWithText>
      <div className="container p-4 mx-auto mt-4 ">
        <InvitedTrips />
        <UpcomingTrips />
      </div>
    </main>
  );
}

function UpcomingTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl">Here are your upcoming trips</h2>
      <TripList key="ownTripList" trips={trips} />
    </div>
  );
}

function InvitedTripCard({ trip }: { trip: Trip }): JSX.Element {
  return (
    <div className="mb-6">
      {trip._id ? (
        <TripCard
          key={trip._id + 'invite'}
          trip={trip}
          listView={true}
          inviteButton={<InviteResponse tripId={trip._id} />}
        />
      ) : null}
    </div>
  );
}

function InvitedTrips(): JSX.Element | null {
  const { isLoading, error, trips } = useInvitedTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (trips.length === 0) return null;
  return (
    <div>
      <h2 className="mb-4 text-2xl">
        Check this out! You have been invited to{' '}
        {trips.length === 1 ? 'this trip' : 'these trips'}
      </h2>
      <TripList
        key="invitedTripList"
        trips={trips}
        renderTrip={InvitedTripCard}
      />
    </div>
  );
}
