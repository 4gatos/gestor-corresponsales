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
  '/gestor/hitos/nuevo-hito',
  '/gestor/hitos/todas',
];

const sourcesUrls = [
  '/gestor/fuentes/nueva-fuente',
  '/gestor/fuentes/todas',
];

const groupSourcesUrls = [
  '/gestor/grupo-fuentes/nueva-fuente',
  '/gestor/grupo-fuentes/todas',
];

const newspapersUrls = [
  '/gestor/periodicos/nuevo-periodico',
  '/gestor/periodicos/todos',
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

function logout(history) {
  fetch(`${apiUrl}/session`, { method: 'delete', credentials: 'include' },)
      .then(response => {
        if (response.status === 204) {
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
          <MenuTab icon="icon-swords" text="Hitos" link="/gestor/hitos/todas" urls={battlesUrls}>
            <ul>
              <MenuSubTab link="/gestor/hitos/todas" text="Editar hitos" />
              <MenuSubTab link="/gestor/hitos/nuevo-hito" text="Añadir hito" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-lens" text="Fuentes" link="/gestor/fuentes/todas" urls={sourcesUrls}>
            <ul>
              <MenuSubTab link="/gestor/fuentes/todas" text="Editar fuentes" />
              <MenuSubTab link="/gestor/fuentes/nueva-fuente" text="Añadir fuente" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-lens" text="Grupo de fuentes" link="/gestor/grupo-fuentes/todas" urls={groupSourcesUrls}>
            <ul>
              <MenuSubTab link="/gestor/grupo-fuentes/todas" text="Editar grupos" />
              <MenuSubTab link="/gestor/grupo-fuentes/nueva-fuente" text="Añadir grupo" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-newspaper" text="Periódicos" link="/gestor/periodicos/todos" urls={newspapersUrls}>
            <ul>
              <MenuSubTab link="/gestor/periodicos/todos" text="Editar periódicos" />
              <MenuSubTab link="/gestor/periodicos/nuevo-periodico" text="Añadir periódico" />
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