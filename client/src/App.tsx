import React from 'react';
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
