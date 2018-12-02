import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const toolbarOptions = {
  options: ['inline', 'link'],
  inline: {
    options: ['bold', 'italic', 'underline'],
  }
}

class TextEditor extends Component {
  render() {
    return (
      <Editor
        wrapperClassName="text-editor"
        editorClassName="text-editor-body"
        toolbarClassName="text-editor-toolbar"
        toolbar={toolbarOptions}
      />
    );
  }
}

export default TextEditor;