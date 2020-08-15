const routingApiUrl =
  process.env.REACT_APP_ROUTING_API_URL || 'https://api.openrouteservice.org/';
// TODO: get API_KEY securly
const routingApiKey = process.env.REACT_APP_ROUTING_API_KEY || '';

// request POIs
const reqBody =
  '{"request":"pois","geometry":{"bbox": [[-0.1068,51.504687],[-0.089934,51.5132]],"geojson":{"type":"Point","coordinates":[-0.106,51.505687]},"buffer":200}}';
const endpoint = 'pois';

const ApiClient = {
  getPois: (): Promise<any> => {
    return fetch(`${routingApiUrl}${endpoint}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: routingApiKey,
      },
      body: reqBody,
    }).then((res) => res.json());
  },
};

export default ApiClient;

const apiUrl = process.env.REACT_APP_API_URL;

type clientOptions<T> = {
  data?: T;
};

export function client<T>(
  endpoint: string,
  { data }: clientOptions<T>
): Promise<T> {
  const headers = new Headers();
  if (data) headers.append('Content-Type', 'application/json');

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
  };

  const request = new Request(`${apiUrl}/${endpoint}`, config);

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
