import React from 'react';
import MapContainer from './components/MapContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import TripList from './components/TripList';

function App(): JSX.Element {
  return (
    <Router>
      <div className="container mx-auto">
        <Navigation />
        <Switch>
          <Route path="/create-trip">
            <CreateTrip />
          </Route>
          <Route path="/trips/:id">
            <PlaceholderTrip />
          </Route>
          <Route path="/">
            <div>Here's a list of trips</div>
            <TripList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function PlaceholderTrip(): JSX.Element {
  const { id } = useParams();
  return <div>Page for trip id {id}</div>;
}

export default App;
