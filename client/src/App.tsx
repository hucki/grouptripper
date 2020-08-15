import React from 'react';
import MapContainer from './components/MapContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';

function App(): JSX.Element {
  return (
    <Router>
      <div className="container mx-auto">
        <Navigation />
        <Switch>
          <Route path="/create-trip">
            <CreateTrip />
            <div>And here is a map of your last Trip</div>
            {/* <MapContainer /> */}
          </Route>
          <Route path="/">
            <div>Here's a list of trips</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
