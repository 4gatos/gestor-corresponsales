import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupSourcesList from '../Components/GroupSources/GroupSourcesList';
import GroupSourcesForm from '../Components/GroupSources/GroupSourcesForm';

const GroupSources = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/grupo-fuentes/todas" component={GroupSourcesList} />
            <Route exact path="/gestor/grupo-fuentes/nueva-fuente" component={GroupSourcesForm} />
            <Route exact path="/gestor/grupo-fuentes/:slug" component={GroupSourcesForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default GroupSources;