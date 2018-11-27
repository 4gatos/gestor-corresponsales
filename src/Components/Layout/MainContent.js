import React from 'react';
import Header from '../Basics/Header';
import { Route, Switch } from "react-router-dom";
import User from '../../Pages/User';
import Home from '../../Pages/Home';

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <Switch>
        <Route exact path='/gestor' component={Home} />
        <Route path='/gestor/usuario' component={User} />
      </Switch>
    </div>
  );
};

export default MainContent;