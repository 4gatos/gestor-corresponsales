import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      Login
      <a><Link to="/gestor">Ir al gestor</Link></a>
    </div>
  );
};

export default Login;