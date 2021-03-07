import React from 'react';
import './App.css';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Switch,
  // useRouteMatch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Proceso from './pages/Descarte';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/proceso">
        <Proceso />
      </Route>
      <Route path="/">
        {false ? <></> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </Switch>
  </Router>
);

export default App;