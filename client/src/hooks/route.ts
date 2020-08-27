import { LatLngTuple } from 'leaflet';
import { useQuery, QueryResult } from 'react-query';
// import ApiClient from './../services/ApiClient';
import { client } from './../services/ApiClient';

const routingApiUrl =
  process.env.REACT_APP_ROUTING_API_URL || 'https://api.openrouteservice.org';
const routingApiKey =
  process.env.REACT_APP_ROUTING_API_KEY || 'yourSecretKeyShouldNotBeHere';

type UseRouteProps = {
  routeCoordinates: LatLngTuple[];
  profile?: string;
};

export function useRoute({
  routeCoordinates,
  profile = 'driving-car',
}: UseRouteProps): QueryResult<GeoJSON.FeatureCollection> {
  const format = 'geojson';
  const routeString = `{"coordinates":${JSON.stringify(
    routeCoordinates
  )}, "radiuses":${JSON.stringify(routeCoordinates.map(() => 1000))}}`;

  const routeQuery = useQuery(['route', routeCoordinates], () =>
    client<GeoJSON.FeatureCollection>(`/v2/directions/${profile}/${format}`, {
      apiBaseUrl: routingApiUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        Accept:
          'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        Authorization: routingApiKey,
      },
      body: routeString,
    })
  );

  return {
    ...routeQuery,
  };
}
