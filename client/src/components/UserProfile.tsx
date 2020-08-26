import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TripList from './TripList';
import { useTrips, useInvitedTrips } from '../hooks/trips';
import { useSinglePhoto } from '../hooks/usePhoto';
import { Trip } from '../types/Trip';
import InviteResponse from './InviteResponse';
import TripCard from './TripCard';
import BackgroundShim from './BackgroundShim';

export default function UserProfile(): JSX.Element {
  const imageSearchString = 'Travel';
  const { user } = useAuth0();
  return (
    <main>
      <HeroImage queryText={imageSearchString} className="flex items-center">
        <div className="container grid h-full p-4 mx-auto lg:grid-cols-3">
          <div className="self-center col-start-1 col-end-3 p-6 text-gray-100">
            <BackgroundShim>
              <h1 className="text-6xl font-semibold">
                {' '}
                Welcome back{user ? `, ${user.name}` : null}!
              </h1>
            </BackgroundShim>
          </div>
        </div>
      </HeroImage>
      <div className="px-4 py-2 mb-4 mr-1 ">
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
      <h4 className="mb-2 text-xl font-bold text-teal-900">
        Here are your upcoming Trips:
      </h4>
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
      <h4 className="mb-2 text-xl font-bold text-teal-900">
        Check this out! You have been invited to{' '}
        {trips.length === 1 ? 'this trip' : 'these trips'}:
      </h4>
      <TripList
        key="invitedTripList"
        trips={trips}
        renderTrip={InvitedTripCard}
      />
    </div>
  );
}

const HeroImage: React.FC<{ queryText: string; className?: string }> = ({
  queryText,
  className,
  children,
}) => {
  const photo = useSinglePhoto({ queryText });

  return (
    <div
      className={`${className} w-full bg-center bg-cover`}
      style={{ backgroundImage: `url(${photo.imgUrl})`, minHeight: '25vh' }}
    >
      {children}
    </div>
  );
};
