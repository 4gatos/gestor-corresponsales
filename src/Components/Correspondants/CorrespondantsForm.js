import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import TextArea from '../Form/TextArea';
import MapFormLines from '../Form/MapFormLines';
import ImgFormField from '../Form/ImgFormField';

class CorrespondantsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRoute = this.onChangeRoute.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      fetch(`${apiUrl}/correspondants/${match.params.slug}`)
        .then(response => response.json())
        .then(correspondant => this.setState({ correspondant, loading: false }));
    }
  }

  onChangeRoute(coordinates) {
    this.setState({ coordinates });
  }

  onSubmit(e) {
    const { form, match } = this.props;
    const { coordinates } = this.state;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0);
        if (!hasErrors) {
          if (coordinates && coordinates.length > 0) {
            fields.coordinates = coordinates;
          }
          this.setState({ loading: true });
          fetch(`${apiUrl}/correspondants${match.params.slug ? `/${match.params.slug}` : ''}`, {
            method: match.params.slug ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
          })
            .then(response => {
              if (!match.params.slug) {
                this.props.history.push('/gestor/corresponsales/todos');
              } else {
                response.json()
                  .then(correspondant => {
                    this.setState({ loading: false, correspondant })
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
    const { loading, correspondant } = this.state;
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
                  initialValue: correspondant ? correspondant.name : '',
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
                  initialValue: correspondant ? correspondant.country : '',
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
                  initialValue: correspondant ? correspondant.date : '',
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
                  initialValue: correspondant ? correspondant.newspaper : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('newspaper')}
            />
            <ImgFormField
              className="full"
              label="Imagen del corresponsal"
              id="mainImg"
              type="text"
              form={form}
              field="mainImg"
              required
              {...getFieldProps('mainImg', {
                  initialValue: correspondant ? correspondant.mainImg : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('mainImg')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Detalles históricos</p>
            <TextArea
              className="full"
              label="Añade la historia de este corresponsal"
              id="historicDetails"
              type="text"
              required
              {...getFieldProps('historicDetails', {
                  initialValue: correspondant ? correspondant.historicDetails : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('historicDetails')}
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
                  initialValue: correspondant ? correspondant.geographicDescription : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('geographicDescription')}
            />
            <MapFormLines
              onChangeRoute={this.onChangeRoute}
              {...(correspondant && correspondant.coordinates ? { routeCoordinates: correspondant.coordinates } : null)}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Documentación</p>
            <TextArea
              className="full"
              label="Añade toda la documentación de este corresponsal"
              id="documentation"
              type="text"
              required
              {...getFieldProps('documentation', {
                  initialValue: correspondant ? correspondant.documentation : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('documentation')}
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