import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
import LandingPageNew from './components/LandingPage';
import PageLayout from './components/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './components/LoadingSpinner.css';

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
                <Suspense
                  fallback={<Loading displayText="Loading trip creation" />}
                >
                  <CreateTrip />
                </Suspense>
              </PageLayout>
            )}
          />
          <Route exact={true} path="/trips/:id">
            <PageLayout>
              <Suspense fallback={<Loading displayText="Loading trip view" />}>
                <TripView />
              </Suspense>
            </PageLayout>
          </Route>
          <Route path="/trips/edit/:id">
            <PageLayout>
              <Suspense fallback={<Loading displayText="Loading edit page" />}>
                <TripEdit />
              </Suspense>
            </PageLayout>
          </Route>
          <Route path="/user-profile">
            <PageLayout>
              <Suspense
                fallback={<Loading displayText="Loading user profile" />}
              >
                <UserProfile />
              </Suspense>
            </PageLayout>
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
}
interface LoadingAttributes {
  displayText: string;
}
const Loading = ({ displayText }: LoadingAttributes): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-700">
      <h1 className="m-4 text-2xl text-white">{displayText}</h1>
      <div className=" lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default App;
