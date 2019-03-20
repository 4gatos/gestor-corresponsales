import React, { Component } from 'react';
import { createForm } from '../../lib/form';
import FormField from '../Form/FormField';
import ImgFormField from '../Form/ImgFormField';
import { apiUrl } from '../../config/constants';
import Loader from '../Basics/Loader';
import MapFormBasic from '../Form/MapFormBasic';

class GroupSourcesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedSources: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeMarker = this.onChangeMarker.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      fetch(`${apiUrl}/group-sources/${match.params.slug}`)
        .then(response => response.json())
        .then(source => this.setState({
          source,
          loading: false,
          ...(source && source.sources && source.sources.length > 0
            ? {selectedSources: source.sources.map(({ id }) => id)} : null)
        }));
    }
    fetch(`${apiUrl}/sources/names`)
      .then(response => response.json())
      .then(sources => this.setState({ sources }));
  }

  onChangeMarker(coordinates) {
    this.setState({
      geographicLng: coordinates.markerLng,
      geographicLat: coordinates.markerLat
    })
  }

  onChangeCheckbox(event) {
    const { value } = event.currentTarget;
    const { selectedSources } = this.state;
    if (selectedSources.indexOf(value) === -1) {
      this.setState({ selectedSources: [...selectedSources, value] });
    } else {
      this.setState({ selectedSources: selectedSources.filter(item => item !== value) })
    }
  }

  onSubmit(e) {
    const { geographicLng, geographicLat, selectedSources } = this.state;
    const { form, match } = this.props;
    e.preventDefault();
    form.validateFields(
      (fieldErrors, fields) => {
        const hasErrors = fieldErrors
          && Object.keys(fieldErrors).some(key => fieldErrors[key].errors.length > 0);
        if (!hasErrors) {
          const finalFields = {...fields};
          if (geographicLat && geographicLng) {
            finalFields.geographicLng = geographicLng;
            finalFields.geographicLat = geographicLat;
          }
          if (selectedSources && selectedSources.length > 0) {
            finalFields.sources = [...selectedSources];
          }
          this.setState({ loading: true });
          fetch(`${apiUrl}/group-sources${match.params.slug ? `/${match.params.slug}` : ''}`, {
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
                this.props.history.push('/gestor/grupo-fuentes/todas');
              } else {
                response.json()
                  .then(source => {
                    this.setState({ loading: false });
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
    const { loading, source, sources, selectedSources } = this.state;
    const { form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <React.Fragment>
        <h2>Añade un nuevo grupo de fuentes</h2>
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
            <p className="panel-title">Fuentes</p>
            {sources && sources.length > 0 && sources.map(({ name, id }) => (
              <label htmlFor={id} key={id} style={{ color: '#989898' }}>
                <input type="checkbox" value={id} id={id} onChange={this.onChangeCheckbox} checked={selectedSources.indexOf(id) !== -1} />
                {name}
              </label>
            ))}
          </div>
          <div className="panel">
            <p className="panel-title">Lugar mencionado</p>
            <MapFormBasic
              onChangeMarker={this.onChangeMarker}
              {...(source && source.geographicLat ? { lat: source.geographicLat } : null)}
              {...(source && source.geographicLng ? { lng: source.geographicLng } : null)}
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

export default createForm()(GroupSourcesForm);