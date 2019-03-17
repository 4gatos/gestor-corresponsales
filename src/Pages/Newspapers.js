import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewspapersList from '../Components/Newspapers/NewspapersList';
import NewspapersForm from '../Components/Newspapers/NewspapersForm';

const Newspapers = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/periodicos/todos" component={NewspapersList} />
            <Route exact path="/gestor/periodicos/nuevo-periodico" component={NewspapersForm} />
            <Route exact path="/gestor/periodicos/:slug" component={NewspapersForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Newspapers;