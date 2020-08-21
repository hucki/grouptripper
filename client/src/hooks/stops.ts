import { useMutation, MutateFunction, queryCache } from 'react-query';
import { client } from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { Stop } from '../types/Stop';
import { Trip } from '../types/Trip';

export function useUpdateAllStops(
  tripId: string
): MutateFunction<Stop[], { stops: Stop[] }> {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const createTrip = async ({ stops }: { stops: Stop[] }): Promise<Stop[]> => {
    let accessToken;
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    }
    return client<Stop[]>(`tripstops/${tripId}/stops`, {
      data: stops,
      method: 'PUT',
      accessToken,
    });
  };

  const [mutate] = useMutation(createTrip, {
    onSuccess: (updatedStops) => {
      const oldTrip = queryCache.getQueryData<Trip>(['trip', tripId]);
      if (!oldTrip) return;

      const updatedTrip = {
        ...oldTrip,
        stopsCollection: {
          ...oldTrip.stopsCollection,
          features: updatedStops,
        },
      };
      queryCache.setQueryData<Trip>(['trip', tripId], updatedTrip);
    },
  });

  return mutate;
}
