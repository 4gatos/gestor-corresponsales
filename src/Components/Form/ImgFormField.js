import React, { Component } from 'react';
import { getErrorText } from '../../config/constants';
import ModalGallery from '../Elements/ModalGallery';

class ImgFormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryOpen: false,
    }
    this.setImgValue = this.setImgValue.bind(this);
    this.openGallery = this.openGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
  }
  
  openGallery() {
    this.setState({ galleryOpen: true });
  }

  closeGallery() {
    this.setState({ galleryOpen: false })
  }
  
  setImgValue(value) {
    this.closeGallery();
    const { form, field } = this.props;
    const fields = {};
    fields[field] = value;
    form.setFieldsValue(fields);
  }

  render() {
    const {
      className,
      value,
      type,
      disabled,
      onChange,
      min,
      max,
      id,
      label,
      required,
      errors
    } = this.props;
    const { galleryOpen } = this.state;
    const hasErrors = errors && errors.length > 0;
    return (
      <div className={`field img-field ${className}`}>
        <label htmlFor={id}>
          {label}
          {required ? ' *' : ''}
        </label>
        <input
          className={`${value ? 'hasValue' : ''}`}
          autoComplete="off"
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          id={id}
          min={min}
          max={max}
        />
        <button type="button" className="btn-img" onClick={this.openGallery}>Añadir / cambiar foto</button>
        {galleryOpen && (
          <ModalGallery onCancel={this.closeGallery} onAccept={this.setImgValue} />
        )}
        {hasErrors && (
          <div className="field-errors">
            {errors.map(error => (
              <p key="error" className="error">{getErrorText(error)}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ImgFormField;