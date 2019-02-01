import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from '../Components/User/Account';
import UserForm from '../Components/User/UserForm';
import UserList from '../Components/User/UserList';

const User = () => {
  return (
    <div>
      <div className="investigation">
        <div className="box mg-top">
          <Switch>
            <Route exact path="/gestor/usuario/mi-cuenta" component={Account} />
            <Route exact path="/gestor/usuario/nuevo-usuario" component={UserForm} />
            <Route exact path="/gestor/usuario/todos" component={UserList} />
            <Route exact path="/gestor/usuario/:id" component={UserForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default User;