import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain: string | any = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId: string | any = process.env.REACT_APP_AUTH0_CLIENT_ID;

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./test/server/dev-server'); // eslint-disable-line
  worker.start();
}

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
