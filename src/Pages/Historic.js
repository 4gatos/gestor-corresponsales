import React, { Component } from 'react';
import TextEditor from '../Components/Basics/TextEditor';

class Historic extends Component {
  render() {
    return (
      <div className="historic">
        <div className="box mg-top">
            <h2>Edita el contenido del Marco Histórico</h2>
            <TextEditor />
            <button className="btn btn-primary mg-top-small">Guardar cambios</button>
        </div>
      </div>
    );
  }
}

export default Historic;