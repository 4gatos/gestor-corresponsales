import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import { apiUrl, checkEmail } from '../../config/constants';
import Loader from '../Basics/Loader';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { form, match } = this.props;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0);
        if (!hasErrors) {
          this.setState({ loading: true });
          fetch(`${apiUrl}/users${match.params.slug ? `/${match.params.slug}` : ''}`, {
            method: match.params.slug ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(fields)
          })
            .then(response => {
              if (!match.params.slug && response.status === 200) {
                this.props.history.push('/gestor/usuario/todos');
              } else if (response.status === 201) {
                response.json()
                  .then(user => {
                    this.setState({ loading: false, user })
                  });
              }
            })
            .catch(error => {
              console.log(error);
              this.setState({ loading: false });
            });
        }
      }
    );
  }

  render() {
    const { loading, user } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <React.Fragment>
        <h2>{user ? 'Editar ' : 'Añade un nuevo '}usuario</h2>
        <form>
          <div className="panel">
            <p className="panel-title">Datos básicos del usuario</p>
            <FormField
              className="full"
              label="Nombre"
              id="name"
              type="text"
              required
              {...getFieldProps('name', {
                  initialValue: user ? user.name : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('name')}
            />
            <FormField
              className="full"
              label="Apellidos"
              id="surname"
              type="text"
              required
              {...getFieldProps('surname', {
                  initialValue: user ? user.surname : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('surname')}
            />
            {!user && (
              <FormField
                className="full"
                label="Correo electrónico"
                id="email"
                type="email"
                required
                {...getFieldProps('email', {
                    initialValue: '',
                    valuePropName: 'value',
                    rules: [{ required: true, validator: checkEmail }]
                })}
                errors={getFieldError('email')}
              />
            )}
            {!user && (
              <FormField
                className="full"
                label="Contraseña"
                id="password"
                type="password"
                required
                {...getFieldProps('password', {
                    initialValue: '',
                    valuePropName: 'value',
                    rules: [{ required: true }]
                })}
                errors={getFieldError('password')}
              />
            )}
            <FormField
              className="full"
              label="Teléfono"
              id="phone"
              type="text"
              {...getFieldProps('phone', {
                  initialValue: user ? user.phone : '',
                  valuePropName: 'value',
              })}
              errors={getFieldError('phone')}
            />
          </div>
          {loading ? <Loader /> : (
            <button className="btn btn-primary mg-top-small" onClick={this.onSubmit}>
              Guardar cambios
            </button>
          )}
        </form>
      </React.Fragment>
    );
  }
}

export default createForm()(UserForm);