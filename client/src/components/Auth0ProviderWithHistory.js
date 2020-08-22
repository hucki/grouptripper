import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain="dev-g7dchufc.eu.auth0.com"
      clientId="0uVmfvzmb1DC3v4dkvFyVWeIQpdRptWS"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience="https://grouptripper/api"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
