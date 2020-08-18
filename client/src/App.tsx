import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import TripList from './components/TripList';
import TripView from './components/TripView';
import StopFinder from './components/StopFinder';

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
            <TripView />
          </Route>
          <Route path="/autocomplete">
            <StopFinder />
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

export default App;
