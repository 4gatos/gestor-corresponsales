import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import ImgFormField from '../Form/ImgFormField';
import TextArea from '../Form/TextArea';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import MapFormBasic from '../Form/MapFormBasic';
import { getRandomString } from '../../lib/utils';

const getBattleFromData = (data) => {
  const otherFieldsAsObject = Object.keys(data).reduce((otherFields, key) => {
    if (key.indexOf('_') > -1) {
      const parts = key.split('_');
      const id = parts[0];
      const field = parts[1];
      const newResult = { ...otherFields };
      if (!newResult[id]) {
        newResult[id] = {};
      }
      newResult[id][field] = data[key];
      return newResult;
    }
    return otherFields;
  }, {});

  const otherFields = Object.keys(otherFieldsAsObject).map(x => ({ ...otherFieldsAsObject[x], id: x }));

  const {
    architecturalDescription,
    date,
    duration,
    geographicDescription,
    history,
    importantPeople,
    mainImg,
    name,
    naturalDescription,
    place
  } = data;

  return {
    architecturalDescription,
    date,
    duration,
    geographicDescription,
    history,
    importantPeople,
    mainImg,
    name,
    naturalDescription,
    place,
    otherFields,
  }
}

class BattleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      otherFieldsArr: [],
      deletedIds: [],
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeMarker = this.onChangeMarker.bind(this);
    this.addOtherField = this.addOtherField.bind(this);
    this.createOtherField = this.createOtherField.bind(this);
    this.deleteOtherField = this.deleteOtherField.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      fetch(`${apiUrl}/battles/${match.params.slug}`)
        .then(response => response.json())
        .then(battle => this.setState({ battle, loading: false }));
    }
  }

  createOtherField(fields) {
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const { id } = fields;
    return (
      <div className="other-field-group">
        <FormField
          className="full"
          label="Título del campo"
          id={`${id}_title`}
          type="text"
          required
          {...getFieldProps(`${id}_title`, {
              initialValue: fields && fields.title ? fields.title : '',
              valuePropName: 'value',
              rules: [{ required: true }]
          })}
          errors={getFieldError(`${id}_title`)}
        />
        <TextArea
          className="full"
          label="Añade el texto de este campo"
          id={`${id}_body`}
          type="text"
          required
          {...getFieldProps(`${id}_body`, {
              initialValue: fields && fields.body ? fields.body : '',
              valuePropName: 'value',
              rules: [{ required: true }]
          })}
          errors={getFieldError(`${id}_body`)}
        />
        <ImgFormField
          className="full"
          label="Imagen del campo"
          id={`${id}_img`}
          type="text"
          form={form}
          field={`${id}_img`}
          {...getFieldProps(`${id}_img`, {
              initialValue: fields && fields.img ? fields.img : '',
              valuePropName: 'value',
          })}
          errors={getFieldError(`${id}_img`)}
        />
        <button type="button" onClick={this.deleteOtherField} value={id}>Borrar campo</button>
      </div>
    );
  }

  addOtherField() {
    const id = getRandomString();
    this.setState(prevState => ({ otherFieldsArr: [...prevState.otherFieldsArr, {id}] }));
  }

  deleteOtherField(event) {
    const { value } = event.target;
    this.setState(({ deletedIds }) => ({ deletedIds: [...deletedIds, value] }));
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
          const finalFields = getBattleFromData(fields);
          if (geographicLat && geographicLng) {
            finalFields.geographicLng = geographicLng;
            finalFields.geographicLat = geographicLat;
          }
          this.setState({ loading: true });
          fetch(`${apiUrl}/battles${match.params.slug ? `/${match.params.slug}` : ''}`, {
            method: match.params.slug ? 'PUT' : 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(finalFields)
          })
            .then(response => {
              if (!match.params.slug) {
                this.props.history.push('/gestor/hitos/todas');
              } else {
                response.json()
                  .then(battle => {
                    this.setState({ loading: false, battle, otherFieldsArr: [], deletedIds: [] });
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
    const { loading, battle, otherFieldsArr, deletedIds } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const otherFieldsNoFilter = [
      ...(battle && battle.otherFields && battle.otherFields.length > 0
        ? battle.otherFields.map(field => {
          return {
            id: field._id,
            body: field.body,
            title: field.title,
            img: field.img
          }
        }) : []),
      ...otherFieldsArr
    ];
    console.log(otherFieldsNoFilter);
    const otherFields = otherFieldsNoFilter
      .filter(field => deletedIds.indexOf(field.id) === -1);
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
            <p className="panel-title">Otros campos</p>
            {otherFields && otherFields.length > 0
              ? (otherFields.map(field => this.createOtherField(field)))
              : <p>Aún no has añadido otros campos</p>
            }
            <button className="btn btn-primary" type="button" onClick={this.addOtherField}>
              Añadir un nuevo campo
            </button>
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