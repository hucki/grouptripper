import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import LandingPage from './components/LandingPage';
import TripView from './components/TripView';
import TripEdit from './components/TripEdit';
import UserProfile from './components/UserProfile';
import DraggableStops from './components/TripDragger';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Prprops {
  componenent: React.FC;
  path: string;
}
//eslint-disable-next-line
const ProtectedRoute = ({ componenent, ...props }: Prprops) => (
  //eslint-disable-next-line
  <Route component={withAuthenticationRequired(componenent)} {...props} />
);

function App(): JSX.Element {
  return (
    <Router>
      <div className="container w-screen h-screen mx-auto">
        <Navigation />
        <Switch>
          <ProtectedRoute path="/create-trip" componenent={CreateTrip} />
          <Route exact={true} path="/trips/:id">
            <TripView />
          </Route>
          <Route path="/trips/edit/:id">
            <TripEdit />
          </Route>
          <Route path="/trips/timeline/:id">
            <DraggableStops />
          </Route>
          <Route exact={true} path="/">
            <LandingPage />
          </Route>
          <Route path="/user-profile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
