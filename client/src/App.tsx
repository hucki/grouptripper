import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
import LandingPageNew from './components/LandingPage';
import PageLayout from './components/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';

const TripEdit = lazy(() => import('./components/TripEdit'));
const TripView = lazy(() => import('./components/TripView'));
const CreateTrip = lazy(() => import('./components/CreateTrip'));
const UserProfile = lazy(() => import('./components/UserProfile'));

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
                <Suspense fallback={<div>Loading trip creation ...</div>}>
                  <CreateTrip />
                </Suspense>
              </PageLayout>
            )}
          />
          <Route exact={true} path="/trips/:id">
            <PageLayout>
              <Suspense fallback={<div>Loading trip view...</div>}>
                <TripView />
              </Suspense>
            </PageLayout>
          </Route>
          <Route path="/trips/edit/:id">
            <PageLayout>
              <Suspense fallback={<div>Loading edit page...</div>}>
                <TripEdit />
              </Suspense>
            </PageLayout>
          </Route>
          <Route path="/user-profile">
            <PageLayout>
              <Suspense fallback={<div>Loading user profile ...</div>}>
                <UserProfile />
              </Suspense>
            </PageLayout>
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
