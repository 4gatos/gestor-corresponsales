import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';
import Icon from '../Basics/Icon';
import Tip from '../Basics/Tip';
import { MAPBOX } from '../../config/constants';

mapboxgl.accessToken = MAPBOX;

class MapFormLines extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: -3.70275,
      lat: 40.4183083,
      zoom: 5,
      coordinates: []
    }

    this.mapContainer = React.createRef();
    this.deleteCoordinate = this.deleteCoordinate.bind(this);
    this.assignRoute = this.assignRoute.bind(this);
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
      const { routeCoordinates } = this.props;
      this.setState(prevState => {
        const stateCopy = {...prevState};
        if (stateCopy.coordinates.length === 0 && routeCoordinates && routeCoordinates.length > 0) {
          stateCopy.coordinates = [...routeCoordinates, [e.lngLat.lng, e.lngLat.lat]];
        } else {
          stateCopy.coordinates = [...stateCopy.coordinates, [e.lngLat.lng, e.lngLat.lat]];
        }

        return stateCopy;
      });
    });
  }

  deleteCoordinate(event) {
    const { routeCoordinates } = this.props;
    event.preventDefault();
    const { value } = event.currentTarget;
    // this.setState(prevState => ({ coordinates: prevState.coordinates.filter(coordinate => coordinate.join(',') !== value) }));
    this.setState(prevState => {
      const stateCopy = {...prevState};
      if (stateCopy.coordinates.length === 0 && routeCoordinates && routeCoordinates.length > 0) {
        stateCopy.coordinates = routeCoordinates.filter(coordinate => coordinate.join(',') !== value);
      } else {
        stateCopy.coordinates = stateCopy.coordinates.filter(coordinate => coordinate.join(',') !== value);
      }

      return stateCopy;
    });
  }

  assignRoute(event) {
    const { onChangeRoute } = this.props;
    const { coordinates } = this.state;
    event.preventDefault();
    if (coordinates && coordinates.length > 0) {
      onChangeRoute(coordinates);
    }
  }

  render() {
    const { coordinates } = this.state;
    const { routeCoordinates } = this.props;
    if (((coordinates && coordinates.length > 0) || (routeCoordinates && routeCoordinates.length > 0)) && this.map) {
      const sourceData = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates && coordinates.length > 0 ? coordinates : routeCoordinates
        }
      };

      if (this.map && !this.map.getSource('trace')) {
        this.map.addSource('trace', { type: 'geojson', data: sourceData });
        this.map.addLayer({
          id: "route",
          type: "line",
          source: "trace",
          paint: {
              "line-color": "#00A8E1",
              "line-opacity": 0.75,
              "line-width": 5
          }
        });
        this.map.jumpTo({ 'center': coordinates && coordinates.length > 0 ? coordinates[0] : routeCoordinates[0], 'zoom': 9 });
      } else {
        this.map.getSource('trace').setData(sourceData);
      }
    }
    return (
      <div className="map-with-coordinates">
        <div className="coordinates">
          <Tip>
            Para agregar una ruta, haz clic en el mapa, a partir del segundo clic la linea comenzará a dibujarse, puede borrar coordenadas en la lista que se creará debajo.
          </Tip>
          <p className="panel-title" style={{ marginTop: '16px' }}>Coordenadas</p>
          {coordinates && coordinates.length > 0 && (
            <div className="coordinates-list">
              {coordinates.map(coordinate => (
                <div className="coordinate-item" key={coordinate}>
                  <p>Lng: {coordinate[0].toFixed(4)}, Lat: {coordinate[1].toFixed(4)}</p>
                  <button value={coordinate} onClick={this.deleteCoordinate}><Icon icon="icon-trash" /></button>
                </div>
              ))}
            </div>
          )}
          {(!coordinates || coordinates.length === 0) && routeCoordinates && routeCoordinates.length > 1 && (
            <div className="coordinates-list">
              {routeCoordinates.map(coordinate => (
                <div className="coordinate-item" key={coordinate}>
                  <p>Lng: {coordinate[0].toFixed(4)}, Lat: {coordinate[1].toFixed(4)}</p>
                  <button value={coordinate} onClick={this.deleteCoordinate}><Icon icon="icon-trash" /></button>
                </div>
              ))}
            </div>
          )}
          {coordinates && coordinates.length > 1 && (
            <button className="btn btn-primary mg-top-small" onClick={this.assignRoute}>
              Asignar marcador
            </button>
          )}
        </div>
        <div ref={this.mapContainer}>
          
        </div>
      </div>
    );
  }
}

export default MapFormLines;