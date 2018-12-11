import React, { Component } from 'react';
import Gallery from '../Components/Elements/Gallery';

class Media extends Component {
  render() {
    return (
      <div className="investigation">
        <div className="box mg-top">
            <h2>Biblioteca de medios</h2>
            <Gallery />
        </div>
      </div>
    );
  }
}

export default Media;