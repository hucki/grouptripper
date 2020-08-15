import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateTrip from './components/CreateTrip';
import Trip from './components/Trip';
import dayjs from 'dayjs';

// const trip1 = {
//   name: 'First Trip to GB',
//   country: 'Great Britain',
//   startDate: dayjs().subtract(5, 'd'),
//   endDate: dayjs(),
//   stops: ['London', 'Birmingham', 'Manchester'],
// };

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
          <Route path="/trip/1">
            <Trip /*trip={trip1} */ />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
