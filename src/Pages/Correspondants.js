import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CorrespondantsList from '../Components/Correspondants/CorrespondantsList';
import CorrespondantsForm from '../Components/Correspondants/CorrespondantsForm';

const Correspondants = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/corresponsales/todos" component={CorrespondantsList} />
            <Route exact path="/gestor/corresponsales/nuevo-corresponsal" component={CorrespondantsForm} />
            <Route exact path="/gestor/corresponsales/:slug" component={CorrespondantsForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Correspondants;