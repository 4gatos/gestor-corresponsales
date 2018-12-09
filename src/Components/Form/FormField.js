import React, { Component } from 'react';
import { getErrorText } from '../../config/constants';

class FormField extends Component {
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
    const hasErrors = errors && errors.length > 0;
    return (
      <div className={`field ${className}`}>
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

export default FormField;