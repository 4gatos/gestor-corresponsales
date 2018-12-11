import React, { Component } from 'react';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';

function getRole(role) {
  if (role === 'admin') {
    return 'Administrador';
  } else if (role === 'user') {
    return 'Usuario';
  }
  return 'Usuario';
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetch(`${apiUrl}/users/${userId}`, {
      method: 'get',
      credentials: 'include'
    })
      .then(response => {
        response.json()
          .then(user => this.setState({ user, loading: false }));
      })
  }
  
  render() {
    const { user, loading } = this.state;
    if (loading) return <Loader />
    return (
      <React.Fragment>
        <h2>Datos básicos de la cuenta</h2>
        <div className="panel">
          <p className="panel-title">Datos básicos</p>
          <div className="info-field">
            <p className="info-title">
              Nombre
            </p>
            <p className="info-body">
              {user && user.name}
            </p>
          </div>
          <div className="info-field">
            <p className="info-title">
              Apellidos
            </p>
            <p className="info-body">
              {user && user.surname}
            </p>
          </div>
          <div className="info-field">
            <p className="info-title">
              Correo electrónico
            </p>
            <p className="info-body">
              {user && user.email}
            </p>
          </div>
          {user && user.phone && (
            <div className="info-field">
              <p className="info-title">
                Teléfono
              </p>
              <p className="info-body">
                {user.phone}
              </p>
            </div>
          )}
          <div className="info-field">
            <p className="info-title">
              Rol
            </p>
            <p className="info-body">
              {user && getRole(user.role)}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;