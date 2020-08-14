import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <header className="container flex flex-row justify-between m-6 mx-auto align-middle">
        <h1 className="text-xl text-red-800">Group Tripper</h1>
        <nav>
          <ul className="flex flex-row space-x-6">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-trip">Create Trip</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/create-trip">
          <div>Create a trip</div>
        </Route>
        <Route path="/">
          <div>Here's a list of trips</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
