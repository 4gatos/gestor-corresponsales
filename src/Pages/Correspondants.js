import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CorrespondantsList from '../Components/Correspondants/CorrespondantsList';

const Correspondants = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/corresponsales/todos" component={CorrespondantsList} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Correspondants;