import React from 'react';
import Header from '../Basics/Header';
import { Route, Switch } from "react-router-dom";
import User from '../../Pages/User';
import Home from '../../Pages/Home';
import Investigation from '../../Pages/Investigation';
import Historic from '../../Pages/Historic';

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <Switch>
        <Route exact path='/gestor' component={Home} />
        <Route path='/gestor/usuario' component={User} />
        <Route path='/gestor/grupo-de-investigacion' component={Investigation} />
        <Route path='/gestor/marco-historico' component={Historic} />
      </Switch>
    </div>
  );
};

export default MainContent;