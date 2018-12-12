import React, { Component } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import Icon from '../Basics/Icon';
import Loader from '../Basics/Loader';
import Tip from '../Basics/Tip';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/plasocloudinary/image/upload';
const CLOUDINARY_PRESET = 'cnpiojmp';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      change: false,
      loading: true
    };
    this.submitPhoto = this.submitPhoto.bind(this);
    this.fileInput = React.createRef();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fetch('https://res.cloudinary.com/plasocloudinary/image/list/corresponsales.json')
      .then(response => response.json()
        .then(images => this.setState({ images: images.resources, loading: false })));
  }

  submitPhoto(e) {
    e.preventDefault();
    console.log(this.fileInput.current.files[0]);
    const fd = new FormData();
    fd.append('file', this.fileInput.current.files[0]);
    fd.append('upload_preset', CLOUDINARY_PRESET);
    fd.append('tags', 'corresponsales');

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: fd
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  onChange() {
    this.setState(prevState => ({ change: !prevState.change }))
  }
  
  render() {
    const { images, loading } = this.state;
    const { handleSelectedImg, selectedImg } = this.props;
    if (loading) return <Loader />
    return (
      <div className="media">
        <Tip>
          Si al subir una foto tarda en estar disponible, espere un momento y recargue la página
        </Tip>
        <div className="file-input-wrapper">
          <input id="file" type="file" onChange={this.onChange} ref={this.fileInput} />
          {this.fileInput.current && this.fileInput.current.files.length > 0
            ? (
              <button className="btn btn-primary" onClick={this.submitPhoto}>Subir foto</button>
            ) : (
              <label htmlFor="file" className="btn btn-primary">
                <Icon icon="icon-media" />
                Añadir una foto
              </label>
            )
          }
        </div>
        <div className="media-gallery">
          <CloudinaryContext cloudName="plasocloudinary">
          {images && images.length > 0
            ? images.map(image => (
              <div
                key={image.public_id}
                id={image.public_id}
                className={`media-img${selectedImg && selectedImg === image.public_id ? ' selected' : ''}`}
                onClick={handleSelectedImg}
              >
                <Image publicId={image.public_id} />
              </div>
            ))
            : <p>No hay fotos</p>
          }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default Gallery;