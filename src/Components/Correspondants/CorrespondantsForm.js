import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';

class CorrespondantsForm extends Component {
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
          fetch(`${apiUrl}/correspondants`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
          }).then(() => {
            form.resetFields();
            this.setState({ loading: false });
          }).catch(error => {
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
      <React.Fragment>
        <h2>Añade un nuevo corresponsal</h2>
        <form>
          <div className="panel">
            <p className="panel-title">Datos básicos de la batalla</p>
            <FormField
              className="full"
              label="Nombre y apellidos"
              id="name"
              type="text"
              required
              {...getFieldProps('name', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('name')}
            />
            <FormField
              className="full"
              label="Nacionalidad"
              id="country"
              type="text"
              required
              {...getFieldProps('country', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('country')}
            />
            <FormField
              className="full"
              label="Fecha"
              id="date"
              type="text"
              required
              {...getFieldProps('date', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('date')}
            />
            <FormField
              className="full"
              label="Periódico"
              id="newspaper"
              type="text"
              required
              {...getFieldProps('newspaper', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('newspaper')}
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

export default createForm()(CorrespondantsForm);