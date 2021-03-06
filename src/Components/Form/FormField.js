import React, { PureComponent } from 'react';
import { getErrorText } from '../../config/constants';

class FormField extends PureComponent {
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
      errors,
      checked,
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
          {...(value ? { value } : null)}
          disabled={disabled}
          onChange={onChange}
          {...(checked ? { checked } : null)}
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