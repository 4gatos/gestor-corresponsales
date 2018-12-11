import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import TextEditor from '../Components/Basics/TextEditor';

class Historic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyState: EditorState.createEmpty()
    };
    this.onHistoryStateChange = this.onHistoryStateChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  onHistoryStateChange(historyState) {
    this.setState({
      historyState,
    });
  };

  getContent() {
    const { historyState } = this.state;
    const prueba = convertToRaw(historyState.getCurrentContent())
    console.log(stateToHTML(convertFromRaw(prueba)));
  }
  
  render() {
    const { historyState } = this.state;
    return (
      <div className="historic">
        <div className="box mg-top">
            <h2>Edita el contenido del Marco Histórico</h2>
            <TextEditor editorState={historyState} onChange={this.onHistoryStateChange} />
            <button className="btn btn-primary mg-top-small" onClick={this.getContent}>Guardar cambios</button>
        </div>
      </div>
    );
  }
}

export default Historic;