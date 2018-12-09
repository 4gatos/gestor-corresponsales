import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import TextArea from '../Form/TextArea';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';

class BattleForm extends Component {
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
          fetch(`${apiUrl}/battles`, {
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
        <h2>Añade una nueva batalla</h2>
        <form>
          <div className="panel">
            <p className="panel-title">Datos básicos de la batalla</p>
            <FormField
              className="full"
              label="Nombre"
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
              label="Localización"
              id="place"
              type="text"
              required
              {...getFieldProps('place', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('place')}
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
              label="Duración de la batalla"
              id="duration"
              type="text"
              required
              {...getFieldProps('duration', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('duration')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Historia</p>
            <TextArea
              className="full"
              label="Añade la historia de esta batalla"
              id="history"
              type="text"
              required
              {...getFieldProps('history', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('history')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Descripción geográfica</p>
            <TextArea
              className="full"
              label="Añade la descripción geográfica de esta batalla"
              id="geographicDescription"
              type="text"
              required
              {...getFieldProps('geographicDescription', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('geographicDescription')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Patrimonio arquitectónico</p>
            <TextArea
              className="full"
              label="Añade información sobre el patrimonio arquitectónico de esta batalla"
              id="architecturalDescription"
              type="text"
              required
              {...getFieldProps('architecturalDescription', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('architecturalDescription')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Patrimonio natural</p>
            <TextArea
              className="full"
              label="Añade información sobre el patrimonio natural de esta batalla"
              id="naturalDescription"
              type="text"
              required
              {...getFieldProps('naturalDescription', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('naturalDescription')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Personas relevantes</p>
            <TextArea
              className="full"
              label="Añade las personas relevantes que intervienen en esta batalla"
              id="importantPeople"
              type="text"
              required
              {...getFieldProps('importantPeople', {
                  initialValue: '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('importantPeople')}
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

export default createForm()(BattleForm);