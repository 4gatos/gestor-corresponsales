import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import ImgFormField from '../Form/ImgFormField';
import TextArea from '../Form/TextArea';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import MapFormBasic from '../Form/MapFormBasic';

class BattleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeMarker = this.onChangeMarker.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      fetch(`${apiUrl}/battles/${match.params.slug}`)
        .then(response => response.json())
        .then(battle => this.setState({ battle, loading: false }));
    }
  }

  onChangeMarker(coordinates) {
    this.setState({
      geographicLng: coordinates.markerLng,
      geographicLat: coordinates.markerLat
    })
  }

  onSubmit(e) {
    const { geographicLng, geographicLat } = this.state;
    const { form, match } = this.props;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0);
        if (!hasErrors) {
          if (geographicLat && geographicLng) {
            fields.geographicLng = geographicLng;
            fields.geographicLat = geographicLat;
          }
          this.setState({ loading: true });
          fetch(`${apiUrl}/battles${match.params.slug ? `/${match.params.slug}` : ''}`, {
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
                this.props.history.push('/gestor/hitos/todas');
              } else {
                response.json()
                  .then(battle => {
                    this.setState({ loading: false, battle })
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
    const { loading, battle } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <React.Fragment>
        <h2>Añade un nuevo hito</h2>
        <form noValidate>
          <div className="panel">
            <p className="panel-title">Datos básicos del hito</p>
            <FormField
              className="full"
              label="Nombre"
              id="name"
              type="text"
              required
              {...getFieldProps('name', {
                  initialValue: battle ? battle.name : '',
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
                  initialValue: battle ? battle.place : '',
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
                  initialValue: battle ? battle.date : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('date')}
            />
            <FormField
              className="full"
              label="Duración del hito"
              id="duration"
              type="text"
              required
              {...getFieldProps('duration', {
                  initialValue: battle ? battle.duration : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('duration')}
            />
            <ImgFormField
              className="full"
              label="Imagen del hito"
              id="mainImg"
              type="text"
              form={form}
              field="mainImg"
              required
              {...getFieldProps('mainImg', {
                  initialValue: battle ? battle.mainImg : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('mainImg')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Historia</p>
            <TextArea
              className="full"
              label="Añade la historia de este hito"
              id="history"
              type="text"
              required
              {...getFieldProps('history', {
                  initialValue: battle ? battle.history : '',
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
              label="Añade la descripción geográfica de este hito"
              id="geographicDescription"
              type="text"
              required
              {...getFieldProps('geographicDescription', {
                  initialValue: battle ? battle.geographicDescription : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('geographicDescription')}
            />
            <MapFormBasic
              onChangeMarker={this.onChangeMarker}
              {...(battle && battle.geographicLat ? { lat: battle.geographicLat } : null)}
              {...(battle && battle.geographicLng ? { lng: battle.geographicLng } : null)}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Patrimonio arquitectónico</p>
            <TextArea
              className="full"
              label="Añade información sobre el patrimonio arquitectónico de este hito"
              id="architecturalDescription"
              type="text"
              {...getFieldProps('architecturalDescription', {
                  initialValue: '',
                  valuePropName: 'value',
              })}
              errors={getFieldError('architecturalDescription')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Patrimonio natural</p>
            <TextArea
              className="full"
              label="Añade información sobre el patrimonio natural de este hito"
              id="naturalDescription"
              type="text"
              {...getFieldProps('naturalDescription', {
                  initialValue: '',
                  valuePropName: 'value',
              })}
              errors={getFieldError('naturalDescription')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Personas relevantes</p>
            <TextArea
              className="full"
              label="Añade las personas relevantes que intervienen en este hito"
              id="importantPeople"
              type="text"
              required
              {...getFieldProps('importantPeople', {
                  initialValue: battle ? battle.importantPeople : '',
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