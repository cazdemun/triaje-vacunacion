import React from 'react';
import './App.css';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Switch,
  // useRouteMatch,
  Route,
  Redirect
} from "react-router-dom";
import Triaje from './pages/Triaje';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/triaje">
        <Triaje />
      </Route>
      <Route path="/">
        {false ? <></> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </Switch>
  </Router>
);

export default App;