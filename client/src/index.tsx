import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./test/server/dev-server'); // eslint-disable-line
  worker.start();
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-g7dchufc.eu.auth0.com"
    clientId="0uVmfvzmb1DC3v4dkvFyVWeIQpdRptWS"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
