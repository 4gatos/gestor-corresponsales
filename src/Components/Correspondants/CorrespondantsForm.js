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
      battle: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      fetch(`${apiUrl}/correspondants/${match.params.slug}`)
        .then(response => response.json())
        .then(correspondant => this.setState({
          correspondant,
          loading: false,
          ...(correspondant.battle ? { battle: correspondant.battle } : null)
        }))
        .then(() => {
          fetch(`${apiUrl}/battles/names`)
            .then(response => response.json())
            .then(battles => this.setState({ battles }));
        });
    }
  }

  handleChange(event) {
    this.setState({battle: event.target.value});
  }

  onChangeRoute(coordinates) {
    this.setState({ coordinates });
  }

  onSubmit(e) {
    const { form, match } = this.props;
    const { coordinates, battle } = this.state;
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
          if (battle) {
            fields.battle = battle;
          }
          fetch(`${apiUrl}/correspondants${match.params.slug ? `/${match.params.slug}` : ''}`, {
            method: match.params.slug ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
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
    const { loading, correspondant, battles, battle } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <React.Fragment>
        <h2>Añade un nuevo corresponsal</h2>
        <form>
          <div className="panel">
            <p className="panel-title">Datos básicos del corresponsal</p>
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
            <ImgFormField
              className="full"
              label="Imagen de fondo para el corresponsal"
              id="backgroundImg"
              type="text"
              form={form}
              field="backgroundImg"
              required
              {...getFieldProps('backgroundImg', {
                  initialValue: correspondant ? correspondant.backgroundImg : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('backgroundImg')}
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
          {battles && battles.length > 0 && (
            <div className="panel">
              <p className="panel-title">Batalla</p>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value={''}>Ninguna</option>
                {battles.map(({ id, name }) => (
                  <option selected={battle === id} key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="panel">
            <p className="panel-title">Descripción geográfica</p>
            <TextArea
              className="full"
              label="Añade la descripción geográfica de este corresponsal"
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
            <ImgFormField
              className="full"
              label="Imagen para la documentación"
              id="documentationImg"
              type="text"
              form={form}
              field="documentationImg"
              {...getFieldProps('documentationImg', {
                  initialValue: correspondant ? correspondant.documentationImg : '',
                  valuePropName: 'value',
              })}
              errors={getFieldError('documentationImg')}
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