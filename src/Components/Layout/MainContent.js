import React from 'react';
import Header from '../Basics/Header';
import HeaderSmall from '../Basics/HeaderSmall';
import { Route, Switch } from "react-router-dom";
import User from '../../Pages/User';
import Home from '../../Pages/Home';
import Investigation from '../../Pages/Investigation';
import Historic from '../../Pages/Historic';
import Correspondants from '../../Pages/Correspondants';
import Battles from '../../Pages/Battles';
import Media from '../../Pages/Media';
import { ROUTES } from '../../config/constants';

const MainContent = () => {
  return (
    <div className="main-content">
      <Switch>
        <Route exact path='/gestor' component={Header} />
        {ROUTES.map(route => (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={() => <HeaderSmall icon={route.icon} title={route.title} subtitle={route.subtitle} />}
          />
        ))}
      </Switch>
      <Switch>
        {/* <Route exact path='/gestor' component={Home} /> */}
        <Route path='/gestor/usuario' component={User} />
        <Route path='/gestor/corresponsales' component={Correspondants} />
        <Route path='/gestor/hitos' component={Battles} />
        <Route path='/gestor/grupo-de-investigacion' component={Investigation} />
        <Route path='/gestor/marco-historico' component={Historic} />
        <Route path='/gestor/medios' component={Media} />
      </Switch>
    </div>
  );
};

export default MainContent;