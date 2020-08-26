import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import TripView from './components/TripView';
import TripEdit from './components/TripEdit';
import UserProfile from './components/UserProfile';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
import LandingPageNew from './components/LandingPage';
import PageLayout from './components/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App(): JSX.Element {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <Route exact={true} path="/">
            <LandingPageNew Navigation={Navigation} />
          </Route>
          <ProtectedRoute
            path="/create-trip"
            component={(): JSX.Element => (
              <PageLayout>
                <CreateTrip />
              </PageLayout>
            )}
          />
          <Route exact={true} path="/trips/:id">
            <PageLayout>
              <TripView />
            </PageLayout>
          </Route>
          <Route path="/trips/edit/:id">
            <PageLayout>
              <TripEdit />
            </PageLayout>
          </Route>
          <Route path="/user-profile">
            <PageLayout>
              <UserProfile />
            </PageLayout>
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
