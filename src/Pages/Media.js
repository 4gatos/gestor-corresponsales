import React, { Component } from 'react';
import Gallery from '../Components/Elements/Gallery';

class Media extends Component {
  render() {
    return (
      <div className="media">
        <div className="box mg-top">
            <h2 style={{ marginBottom: '16px' }}>Biblioteca de medios</h2>
            <Gallery />
        </div>
      </div>
    );
  }
}

export default Media;