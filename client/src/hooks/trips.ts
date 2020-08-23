import {
  useQuery,
  useMutation,
  QueryResult,
  MutationResultPair,
  queryCache,
} from 'react-query';
import { client } from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { Trip } from '../types/Trip';
import { response } from 'msw/lib/types';

export function useTrips(): QueryResult<Trip[]> & { trips: Trip[] } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const tripsQuery = useQuery('trips', async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip[]>('trips', { accessToken });
  });

  const trips = tripsQuery.data ?? [];

  return {
    trips,
    ...tripsQuery,
  };
}

export function useInvitedTrips(): QueryResult<Trip[]> & { trips: Trip[] } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const tripsQuery = useQuery(['trips', 'invited'], async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip[]>('trips/invited', { accessToken });
  });

  const trips = tripsQuery.data ?? [];

  return {
    trips,
    ...tripsQuery,
  };
}

export function useTrip(
  id: string
): QueryResult<Trip> & { trip: Trip | undefined } {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const tripsQuery = useQuery(['trip', id], async () => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip>(`trips/${id}`, { accessToken });
  });

  const trip = tripsQuery.data;

  return {
    trip,
    ...tripsQuery,
  };
}

export function useCreateTrip(): MutationResultPair<
  Trip,
  {
    trip: Trip;
  },
  Error
> {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const createTrip = async ({ trip }: { trip: Trip }): Promise<Trip> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip>('trips', { data: trip, accessToken });
  };

  return useMutation(createTrip);
}

export function useInviteToTrip(
  tripId: string
): MutationResultPair<
  Trip,
  {
    email: string;
  },
  Error
> {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const inviteToTrip = async ({ email }: { email: string }): Promise<Trip> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<{ email: string }, Trip>(`trips/${tripId}/invite`, {
      data: { email },
      accessToken,
      method: 'PUT',
    });
  };

  return useMutation(inviteToTrip, {
    onMutate: ({ email }) => {
      queryCache.cancelQueries(['trip', tripId]);

      const oldTrip = queryCache.getQueryData<Trip>(['trip', tripId]);
      if (!oldTrip) return;

      const updatedTrip = {
        ...oldTrip,
        invitedEmails: [...(oldTrip.invitedEmails || []), email],
      };

      queryCache.setQueryData<Trip>(['trip', tripId], updatedTrip);

      return (): void =>
        queryCache.setQueryData<Trip>(['trip', tripId], oldTrip);
    },
    onError: (err, newStops, rollback) => {
      (rollback as () => void)();
    },
    onSuccess: (updatedStops) => {
      queryCache.invalidateQueries(['trip', tripId]);
    },
  });
}

export function useInviteResponse(
  tripId: string,
  response: 'accept' | 'reject'
): MutationResultPair<Trip, undefined, Error> {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const inviteToTrip = async (): Promise<Trip> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Trip>(`trips/${tripId}/${response}_invite`, {
      accessToken,
      method: 'PUT',
    });
  };

  return useMutation(inviteToTrip, {
    onSuccess: (updatedStops) => {
      queryCache.invalidateQueries(['trip', tripId]);
      queryCache.invalidateQueries(['trips']);
    },
  });
}
