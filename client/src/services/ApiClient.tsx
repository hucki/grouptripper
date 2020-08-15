const apiUrl =
  process.env.REACT_APP_ROUTING_API_URL || 'https://api.openrouteservice.org/';
// TODO: get API_KEY securly
const apiKey = process.env.REACT_APP_ROUTING_API_KEY || '';

// request POIs
const reqBody =
  '{"request":"pois","geometry":{"bbox": [[-0.1068,51.504687],[-0.089934,51.5132]],"geojson":{"type":"Point","coordinates":[-0.106,51.505687]},"buffer":200}}';
const endpoint = 'pois';

const ApiClient = {
  getPois: (): Promise<any> => {
    return fetch(`${apiUrl}${endpoint}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: apiKey,
      },
      body: reqBody,
    }).then((res) => res.json());
  },
};

export default ApiClient;
