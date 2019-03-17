import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import ImgFormField from '../Form/ImgFormField';
import TextArea from '../Form/TextArea';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import MapFormBasic from '../Form/MapFormBasic';
import { getRandomString } from '../../lib/utils';

const getSourceFromData = (data) => {
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
    dateNewspaper,
    date,
    description,
    importantPeople,
    mainImg,
    name,
    naturalDescription,
    place
  } = data;

  return {
    dateNewspaper,
    date,
    description,
    importantPeople,
    mainImg,
    name,
    naturalDescription,
    place,
    otherFields,
  }
}

class SourcesForm extends Component {
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
      fetch(`${apiUrl}/sources/${match.params.slug}`)
        .then(response => response.json())
        .then(source => this.setState({ source, loading: false }));
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
          const finalFields = getSourceFromData(fields);
          if (geographicLat && geographicLng) {
            finalFields.geographicLng = geographicLng;
            finalFields.geographicLat = geographicLat;
          }
          this.setState({ loading: true });
          fetch(`${apiUrl}/sources${match.params.slug ? `/${match.params.slug}` : ''}`, {
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
                this.props.history.push('/gestor/fuentes/todas');
              } else {
                response.json()
                  .then(source => {
                    this.setState({ loading: false, source, otherFieldsArr: [], deletedIds: [] });
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
    const { loading, source, otherFieldsArr, deletedIds } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const otherFieldsNoFilter = [
      ...(source && source.otherFields && source.otherFields.length > 0
        ? source.otherFields.map(field => {
          return {
            id: field._id,
            body: field.body,
            title: field.title,
            img: field.img
          }
        }) : []),
      ...otherFieldsArr
    ];
    const otherFields = otherFieldsNoFilter
      .filter(field => deletedIds.indexOf(field.id) === -1);
    return (
      <React.Fragment>
        <h2>Añade una nueva fuente</h2>
        <form noValidate>
          <div className="panel">
            <p className="panel-title">Datos básicos de la fuente</p>
            <FormField
              className="full"
              label="Nombre"
              id="name"
              type="text"
              required
              {...getFieldProps('name', {
                  initialValue: source ? source.name : '',
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
                  initialValue: source ? source.place : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('place')}
            />
            <FormField
              className="full"
              label="Fecha del texto"
              id="date"
              type="text"
              required
              {...getFieldProps('date', {
                  initialValue: source ? source.date : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('date')}
            />
            <FormField
              className="full"
              label="Fecha del ejemplar del periódico"
              id="dateNewspaper"
              type="text"
              required
              {...getFieldProps('dateNewspaper', {
                  initialValue: source ? source.dateNewspaper : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('dateNewspaper')}
            />
            <ImgFormField
              className="full"
              label="Imagen de la fuente"
              id="mainImg"
              type="text"
              form={form}
              field="mainImg"
              required
              {...getFieldProps('mainImg', {
                  initialValue: source ? source.mainImg : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('mainImg')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Resumen del contenido</p>
            <TextArea
              className="full"
              label="Añade el resumen del contenido de esta fuente"
              id="description"
              type="text"
              required
              {...getFieldProps('description', {
                  initialValue: source ? source.description : '',
                  valuePropName: 'value',
                  rules: [{ required: true }]
              })}
              errors={getFieldError('description')}
            />
          </div>
          <div className="panel">
            <p className="panel-title">Lugar mencionado</p>
            <MapFormBasic
              onChangeMarker={this.onChangeMarker}
              {...(source && source.geographicLat ? { lat: source.geographicLat } : null)}
              {...(source && source.geographicLng ? { lng: source.geographicLng } : null)}
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

export default createForm()(SourcesForm);