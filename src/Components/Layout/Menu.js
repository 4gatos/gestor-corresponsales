import React from 'react';
import MenuTab from './MenuTab';
import { Link, withRouter } from 'react-router-dom';
import MenuSubTab from './MenuSubTab';
import { apiUrl } from '../../config/constants';

const userUrls = [
  '/gestor/usuario/mi-cuenta',
  '/gestor/usuario/nuevo-usuario',
  '/gestor/usuario/todos',
];

const correspondantUrls = [
  '/gestor/corresponsales/nuevo-corresponsal',
  '/gestor/corresponsales/todos',
];

const battlesUrls = [
  '/gestor/batallas/nueva-batalla',
  '/gestor/batallas/todas',
];

const investigationUrls = [
  '/gestor/grupo-de-investigacion',
];

const historicUrls = [
  '/gestor/marco-historico',
];

const mediaUrls = [
  '/gestor/medios',
];

function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function logout(history) {
  fetch(`${apiUrl}/session`, { method: 'delete', credentials: 'include' },)
      .then(response => {
        if (response.status === 204) {
          delete_cookie('connect.sid');
          history.push('/');
        }
      });
}

const Menu = ({ history }) => {
  const role = JSON.parse(localStorage.getItem('userRole'));
  return (
    <div className="menu">
      <div className="menu-wrapper">
        <div className="logo">
          <Link to="/gestor"><img src="/img/logo.png" alt="CEU"/></Link>
        </div>
        <ul className="menu-list">
          <MenuTab icon="icon-user" text="Usuario" link="/gestor/usuario/mi-cuenta" urls={userUrls}>
            <ul>
              <MenuSubTab link="/gestor/usuario/mi-cuenta" text="Mi cuenta" />
              {role === 'admin' && <MenuSubTab link="/gestor/usuario/nuevo-usuario" text="Añadir usuario" />}
              <MenuSubTab link="/gestor/usuario/todos" text="Usuarios" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-feather" text="Corresponsales" link="/gestor/corresponsales/todos" urls={correspondantUrls}>
            <ul>
            <MenuSubTab link="/gestor/corresponsales/todos" text="Editar corresponsales" />
            <MenuSubTab link="/gestor/corresponsales/nuevo-corresponsal" text="Añadir corresponsal" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-swords" text="Batallas" link="/gestor/batallas/todas" urls={battlesUrls}>
            <ul>
              <MenuSubTab link="/gestor/batallas/todas" text="Editar batallas" />
              <MenuSubTab link="/gestor/batallas/nueva-batalla" text="Añadir batalla" />
            </ul>
          </MenuTab>
          {/*<MenuTab icon="icon-lens" text="Grupo de investigación" link="/gestor/grupo-de-investigacion" urls={investigationUrls} />
          <MenuTab icon="icon-historical-frame" text="Marco histórico" link="/gestor/marco-historico" urls={historicUrls} /> */}
          <MenuTab icon="icon-media" text="Medios" link="/gestor/medios" urls={mediaUrls} />
          <li className="menu-tab logout-tab" onClick={() => logout(history)}>
            <div className="logout">
              <span className="tab-text">Cerrar sesión</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);