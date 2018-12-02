import React, { Component } from 'react';
import TextEditor from '../Components/Basics/TextEditor';

class Investigation extends Component {
  render() {
    return (
      <div className="investigation">
        <div className="box mg-top">
            <h2>Edita el contenido del Grupo de Investigación</h2>
            <TextEditor />
            <button style={{ marginTop: '16px' }} className="btn btn-primary">Guardar cambios</button>
        </div>
      </div>
    );
  }
}

export default Investigation;