import {
  useQuery,
  useMutation,
  QueryResult,
  MutationResultPair,
  queryCache,
} from 'react-query';
import { useAuthenticatedClient } from '../services/ApiClient';
import { Trip } from '../types/Trip';

export function useTrips(): QueryResult<Trip[]> & { trips: Trip[] } {
  const client = useAuthenticatedClient<Trip[]>();

  const tripsQuery = useQuery('trips', async () => {
    return client('trips');
  });

  const trips = tripsQuery.data ?? [];

  return {
    trips,
    ...tripsQuery,
  };
}

export function useInvitedTrips(): QueryResult<Trip[]> & { trips: Trip[] } {
  const client = useAuthenticatedClient<Trip[]>();

  const tripsQuery = useQuery(['trips', 'invited'], async () => {
    return client('trips/invited');
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
  const client = useAuthenticatedClient<Trip>();

  const tripsQuery = useQuery(['trip', id], async () => {
    return client(`trips/${id}`);
  });

  const trip = tripsQuery.data;

  return {
    trip,
    ...tripsQuery,
  };
}

type Participant = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export function useParticipants(
  tripId: string
): QueryResult<Participant[]> & { participants: Participant[] } {
  const client = useAuthenticatedClient<Participant[]>();

  const participantsQuery = useQuery(['participants', tripId], async () => {
    return client(`trips/${tripId}/participantProfiles`);
  });

  const participants = participantsQuery.data ?? [];

  return {
    participants,
    ...participantsQuery,
  };
}

export function useCreateTrip(): MutationResultPair<
  Trip,
  {
    trip: Trip;
  },
  Error
> {
  const client = useAuthenticatedClient<Trip>();

  const createTrip = async ({ trip }: { trip: Trip }): Promise<Trip> => {
    return client('trips', { data: trip });
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
  const client = useAuthenticatedClient<{ email: string }, Trip>();

  const inviteToTrip = async ({ email }: { email: string }): Promise<Trip> => {
    return client(`trips/${tripId}/invite`, {
      data: { email },
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
  const client = useAuthenticatedClient<Trip>();

  const inviteToTrip = async (): Promise<Trip> => {
    return client(`trips/${tripId}/${response}_invite`, {
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
