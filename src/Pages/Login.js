import React, { Component } from 'react';
import { createForm } from '../lib/form';
import FormField from '../Components/Form/FormField';
import { checkEmail, apiUrl } from '../config/constants';
import Loader from '../Components/Basics/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0);
        if (!hasErrors) {
          this.setState({ loading: true });
          console.log(fields);
          fetch(`${apiUrl}/session`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(fields)
          })
            .then(response => {
              console.log(response);
              response.json()
                  .then(user => {
                    console.log(user);
                    this.setState({ loading: false });
                  });
              // this.props.history.push('/gestor');
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
    const { loading } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <div className="login">
        <div className="login-wrapper">
          <img src="/img/logo.png" alt="CEU"/>
          <div className="login-form">
            <form>
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
              {loading ? <Loader /> : (
                <button className="btn btn-primary mg-top-small" onClick={this.onSubmit}>
                  Acceder
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(Login);