const REACT_APP_ISS_URL = 'http://api.open-notify.org/iss-now.json';

interface IIss {
  iss_position: {
    latitude: number;
    longitude: number;
  };
  timestamp: Date;
  message: String;
}

const ApiClient = {
  getPosition: (): Promise<IIss> => {
    return fetch(REACT_APP_ISS_URL).then((res) => res.json());
  },
};

export default ApiClient;
