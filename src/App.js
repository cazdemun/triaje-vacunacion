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

import { useMachine } from '@xstate/react';
import { triajeMachine } from './pages/Triaje';

const App = () => {
  const [current, send] = useMachine(triajeMachine);

  console.log(current.value)
  console.log(current.context.respuestas2)

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login {...{ current, send }}/>
        </Route>
        <Route path="/triaje">
          <Triaje {...{ current, send }}/>
        </Route>
        <Route path="/">
          {false ? <></> : <Redirect to={{ pathname: '/login' }} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;