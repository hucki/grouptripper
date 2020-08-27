const routingApiUrl =
  process.env.REACT_APP_ROUTING_API_URL || 'https://api.openrouteservice.org';
const routingApiKey =
  process.env.REACT_APP_ROUTING_API_KEY || 'yourSecretKeyShouldNotBeHere';

const reqRoute = {
  LatLng: [
    [-0.09, 51.505],
    [-0.1068, 51.51258],
  ],
  profile: 'driving-car',
  format: 'geojson',
};

// Geocode options
const reqGeocode = {
  focusPointLon: 51.504703,
  focusPointLat: -0.106718,
  boundaryCountry: 'GBR',
  size: 1,
};
// request POIs
const reqBodyPoi =
  '{"request":"pois","geometry":{"bbox": [[-0.1068,51.504687],[-0.089934,51.5132]],"geojson":{"type":"Point","coordinates":[-0.1068,51.504687]},"buffer":200}}';

const ApiClient = {
  getPois: (): Promise<GeoJSON.FeatureCollection> => {
    return fetch(`${routingApiUrl}/pois`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: routingApiKey,
      },
      body: reqBodyPoi,
    }).then((res) => res.json());
  },
  getRoute: (
    endpoint: string,
    reqBodyString: string
  ): Promise<GeoJSON.FeatureCollection> => {
    return fetch(
      // 'localhost',
      `${routingApiUrl}/v2/directions/${reqRoute.profile}/${reqRoute.format}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          Accept:
            'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          Authorization: routingApiKey,
        },
        body: reqBodyString,
      }
    ).then((res) => res.json());
  },
  getGeocode: (searchString: string): Promise<GeoJSON.FeatureCollection> => {
    return fetch(
      `${routingApiUrl}/geocode/search?api_key=${routingApiKey}&text=${searchString}&focus.point.lon=${reqGeocode.focusPointLon}&focus.point.lat=${reqGeocode.focusPointLat}&boundary.country=${reqGeocode.boundaryCountry}&size=${reqGeocode.size}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json());
  },
};

export default ApiClient;

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

type clientOptions<T> = {
  data?: T;
  accessToken?: string;
  queryParams?: QueryParams;
};

export function client<T, P = T>(
  endpoint: string,
  {
    data,
    accessToken,
    queryParams = {},
    ...options
  }: clientOptions<T> & RequestInit = {}
): Promise<P> {
  const headers = new Headers();
  if (data) headers.append('Content-Type', 'application/json');
  if (accessToken) headers.append('Authorization', `Bearer ${accessToken}`);

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...options,
  };

  const queryString = queryParamsToString(queryParams);

  const request = new Request(
    encodeURI(`${apiUrl}/${endpoint}${queryString}`),
    config
  );

  return window.fetch(request).then(async (response) => {
    try {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  });
}

type QueryParams = {
  [key: string]: string;
};

const queryParamsToString: (queryParams: QueryParams) => string = (
  queryParams
) => {
  const queryString = Object.entries(queryParams).reduce(
    (queryString, [key, value]) => {
      return queryString + `${key}=${value}`;
    },
    ''
  );

  return queryString ? `?${queryString}` : '';
};
