import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SourcesList from '../Components/Sources/SourcesList';
import SourceForm from '../Components/Sources/SourcesForm';

const Sources = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/fuentes/todas" component={SourcesList} />
            <Route exact path="/gestor/fuentes/nueva-fuente" component={SourceForm} />
            <Route exact path="/gestor/fuentes/:slug" component={SourceForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Sources;