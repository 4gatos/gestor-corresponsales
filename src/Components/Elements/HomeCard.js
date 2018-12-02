import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = () => {
  return (
    <div className="card">
      <div className="card-img">
        <img src="/img/batallas.png" alt=""/>
      </div>
      <div className="card-body">
        <h3>Título</h3>
        <p>En esta sección podrás crear y editar las batallas carlistas, añadir imágenes, localizaciones, descripciones...</p>
        <div className="card-buttons">
          <Link to="/gestor" className="add">Añadir</Link>
          <Link to="/gestor" className="edit">Editar</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;