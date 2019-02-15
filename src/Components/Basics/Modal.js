import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ onAccept, onCancel, id }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-body">
        <p>¿Estás seguro de querer borrar este documento?</p>
      </div>
      <div className="modal-actions">
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="button" onClick={onAccept} value={id}>Aceptar</button>
      </div>
    </div>,
      document.getElementById('modal')
    );
};

export default Modal;