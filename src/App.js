import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './lib/PrivateRoute';
import Login from './Pages/Login';
import Manager from './Pages/Manager';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoute path='/gestor' component={Manager} />
    </Switch>
  </Router>
);

export default App;
