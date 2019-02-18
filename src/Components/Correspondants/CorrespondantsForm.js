import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import TextArea from '../Form/TextArea';
import MapFormLines from '../Form/MapFormLines';
import ImgFormField from '../Form/ImgFormField';
import { getRandomString } from '../../lib/utils';

const getCorrespondantFromData = (data) => {
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
    name,
    country,
    date,
    newspaper,
    mainImg,
    backgroundImg,
    historicDetails,
    geographicDescription,
  } = data;

  return {
    name,
    country,
    date,
    newspaper,
    mainImg,
    backgroundImg,
    historicDetails,
    geographicDescription,
    otherFields,
  }
}

class CorrespondantsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      battle: null,
      otherFieldsArr: [],
      deletedIds: [],
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addOtherField = this.addOtherField.bind(this);
    this.createOtherField = this.createOtherField.bind(this);
    this.deleteOtherField = this.deleteOtherField.bind(this);
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

  handleChange(event) {
    this.setState({battle: event.target.value});
  }

  onChangeRoute(coordinates) {
    this.setState({ coordinates });
  }

  onSubmit(e) {
    const { form, match } = this.props;
    const { coordinates, battle, correspondant } = this.state;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = (fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0))
          || ((!coordinates || coordinates.length === 0) && (!correspondant || !correspondant.coordinates || correspondant.coordinates.length === 0));
        if (!hasErrors) {
          const finalFields = getCorrespondantFromData(fields);
          if (coordinates && coordinates.length > 0) {
            finalFields.coordinates = coordinates;
            finalFields.geographicLat = coordinates[0][1];
            finalFields.geographicLng = coordinates[0][0];
          }
          if (battle) {
            finalFields.battle = battle;
          }

          this.setState({ loading: true });
          fetch(`${apiUrl}/correspondants${match.params.slug ? `/${match.params.slug}` : ''}`, {
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
                this.props.history.push('/gestor/corresponsales/todos');
              } else {
                response.json()
                  .then(correspondant => {
                    this.setState({ loading: false, correspondant })
                  });
              }
            })
            .catch(error => {
              this.setState({ loading: false });
            });
        }
      }
    );
  }

  render() {
    const { loading, correspondant, battles, battle, otherFieldsArr, deletedIds } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const otherFieldsNoFilter = [
      ...(correspondant && correspondant.otherFields && correspondant.otherFields.length > 0
        ? correspondant.otherFields.map(field => {
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

export default createForm()(CorrespondantsForm);