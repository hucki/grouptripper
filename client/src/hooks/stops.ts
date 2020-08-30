import {
  useMutation,
  MutateFunction,
  queryCache,
  MutationResultPair,
} from 'react-query';
import { useAuthenticatedClient } from '../services/ApiClient';
import { Stop } from '../types/Stop';
import { Trip } from '../types/Trip';
type AddStopInputProps = {
  stop: Stop;
};
export function useCreateStop(
  tripId: string
): MutationResultPair<Stop, AddStopInputProps, Error> {
  const client = useAuthenticatedClient<Stop>();

  const addStop = async ({ stop }: AddStopInputProps): Promise<Stop> => {
    return client(`tripstops/${tripId}/stops`, {
      data: stop,
    });
  };

  return useMutation(addStop, {
    onSuccess: (updatedStops) => {
      queryCache.invalidateQueries(['trip', tripId]);
      queryCache.invalidateQueries(['trip']);
    },
  });
}

export function useUpdateAllStops(
  tripId: string
): MutateFunction<Stop[], { stops: Stop[] }> {
  const client = useAuthenticatedClient<Stop[]>();

  const createTrip = async ({ stops }: { stops: Stop[] }): Promise<Stop[]> => {
    return client(`tripstops/${tripId}/stops`, {
      data: stops,
      method: 'PUT',
    });
  };

  const [mutate] = useMutation(createTrip, {
    onMutate: ({ stops: newStops }) => {
      queryCache.cancelQueries(['trip', tripId]);

      const oldTrip = queryCache.getQueryData<Trip>(['trip', tripId]);
      if (!oldTrip) return;

      const updatedTrip = {
        ...oldTrip,
        stopsCollection: {
          ...oldTrip.stopsCollection,
          features: newStops,
        },
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

  return mutate;
}
