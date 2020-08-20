import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN; // eslint-disable-line
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; // eslint-disable-line

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./test/server/dev-server'); // eslint-disable-line
  worker.start();
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-g7dchufc.eu.auth0.com"
    clientId="0uVmfvzmb1DC3v4dkvFyVWeIQpdRptWS"
    redirectUri={window.location.origin}
    audience="https://grouptripper/api"
    useRefreshTokens={true}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
