import { LatLngTuple } from 'leaflet';
import { useQuery, QueryResult } from 'react-query';
import ApiClient from './../services/ApiClient';

type UseRouteProps = {
  routeCoordinates: LatLngTuple[];
};

export function useRoute({
  routeCoordinates,
}: UseRouteProps): QueryResult<GeoJSON.FeatureCollection> {
  const reqBodyRoute = `{"coordinates":${JSON.stringify(
    routeCoordinates
  )}, "radiuses":${JSON.stringify(routeCoordinates.map(() => 1000))}}`;
  const routeQuery = useQuery(['route', routeCoordinates], () =>
    ApiClient.getRoute(reqBodyRoute)
  );

  return {
    ...routeQuery,
  };
}
