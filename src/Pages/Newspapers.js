import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewspapersList from '../Components/Newspapers/NewspapersList';
import BattleForm from '../Components/Battles/BattleForm';

const Newspapers = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/periodicos/todos" component={NewspapersList} />
            <Route exact path="/gestor/periodicos/nuevo-periodico" component={BattleForm} />
            <Route exact path="/gestor/periodicos/:slug" component={BattleForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Newspapers;