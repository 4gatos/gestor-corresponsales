import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Icon from '../Basics/Icon';
import Tip from '../Basics/Tip';
import { MAPBOX } from '../../config/constants';

mapboxgl.accessToken = MAPBOX;

class MapFormBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -3.70275,
      lat: 40.4183083,
      zoom: 5,
      markerLng: '',
      markerLat: '',
    }

    this.mapContainer = React.createRef();
    this.onChangeMarker = this.onChangeMarker.bind(this);
    this.assignMarker = this.assignMarker.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/basic-v9',
      center: [lng, lat],
      zoom,
    });

    this.map.on('move', () => {
      const { lng: mapLng, lat: mapLat } = this.map.getCenter();

      this.setState({
        lng: mapLng.toFixed(4),
        lat: mapLat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
      })
    });
    this.map.on('click', (e) => {
      this.setState({ markerLng: e.lngLat.lng, markerLat: e.lngLat.lat });
    });
  }

  onChangeMarker(event) {
    if (event.target.id === 'lng') {
      this.setState({ markerLng: event.target.value })
    } else if (event.target.id === 'lat') {
      this.setState({ markerLat: event.target.value })
    }
  }

  assignMarker(event) {
    event.preventDefault();
    const { markerLat, markerLng } = this.state;
    const { onChangeMarker } = this.props;
    if (markerLat && markerLat !== '' && markerLng && markerLng !== '') {
      onChangeMarker({ markerLng, markerLat });
    }
  }
  
  render() {
    const { markerLat, markerLng } = this.state;
    const { lat, lng } = this.props;
    if (this.map && markerLat && markerLng) {
      if (this.marker) {
        this.marker.remove();
      }
      this.marker = new mapboxgl.Marker().setLngLat([markerLng, markerLat]).addTo(this.map);
    } else if (this.map && lat && lng) {
      this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    }
    return (
      <div className="map-with-coordinates">
        <div className="coordinates">
          <Tip>
            Para agregar una localización, introduce unas coordenadas o selecciona un punto en el mapa. Asigna el marcador y guarda los cambios.
          </Tip>
          <div className="coordinates-with-label">
            <label htmlFor="lng">Longitud</label>
            <div className="coordinates-input-wrapper">
              <div className="coordinates-icon">
                <Icon icon="icon-map-coordinates" />
              </div>
              <input id="lng" type="number" min="-90" max="90" value={markerLng || lng} onChange={this.onChangeMarker} autoComplete="off" />
            </div>
          </div>
          <div className="coordinates-with-label">
            <label htmlFor="lat">Latitud</label>
            <div className="coordinates-input-wrapper">
              <div className="coordinates-icon">
                <Icon icon="icon-map-coordinates" />
              </div>
              <input id="lat" type="number" min="-90" max="90" value={markerLat || lat} onChange={this.onChangeMarker} autoComplete="off" />
            </div>
          </div>
          <button className="btn btn-primary mg-top-small" onClick={this.assignMarker}>
            Asignar marcador
          </button>
        </div>
        <div ref={this.mapContainer}>
          
        </div>
      </div>
    );
  }
}

export default MapFormBasic;