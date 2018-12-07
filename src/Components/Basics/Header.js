import React from 'react';
import { Route, Switch } from "react-router-dom";

const Header = () => {
  return (
    <div className="header big">
      <h1>¡Bienvenido!</h1>
      <p className="welcome-description">
        Este es el editor administrativo de la aplicación de corresponsales de guerra del CEU, <strong>selecciona un campo</strong> y haz crecer esta comunidad.
      </p>
    </div>
  );
};

export default Header;