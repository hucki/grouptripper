import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {// eslint-disable-line

  const history = useHistory();

  const onRedirectCallback = (appState) => {// eslint-disable-line
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
