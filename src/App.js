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

const App = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/descarte">
        Descarte
      </Route>
      <Route path="/evaluacion">
        Evaluacion
      </Route>
      <Route path="/resultado">
        Resultado
      </Route>
      <Route path="/consentimiento">
        Consentimiento
      </Route>
      <Route path="/">
        {false ? <></> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </Switch>
  </Router>
);

export default App;