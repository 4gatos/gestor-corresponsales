import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BattlesList from '../Components/Battles/BattlesList';
import BattleForm from '../Components/Battles/BattleForm';

const Battles = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/hitos/todas" component={BattlesList} />
            <Route exact path="/gestor/hitos/nuevo-hito" component={BattleForm} />
            <Route exact path="/gestor/hitos/:slug" component={BattleForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Battles;