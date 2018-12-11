import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';

class ModalGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      selectedImg: ''
    }
    this.sendSelectedImg = this.sendSelectedImg.bind(this);
    this.handleSelectedImg = this.handleSelectedImg.bind(this);
  }

  handleSelectedImg(event) {
    const { id } = event.currentTarget;
    this.setState({ selectedImg: id });
  }

  sendSelectedImg() {
    const { selectedImg } = this.state;
    const { onAccept } = this.props;
    if (selectedImg) {
      onAccept(selectedImg);
    } else {
      this.setState({ error: true });
    }
  }
  
  render() {
    const { selectedImg } = this.state;
    const { onCancel } = this.props;
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-title">
            <p>Elige una imagen</p>
          </div>
          <div className="modal-body">
            <Gallery handleSelectedImg={this.handleSelectedImg} selectedImg={selectedImg} />
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-primary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={this.sendSelectedImg}>
              Elegir
            </button>
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}

export default ModalGallery;