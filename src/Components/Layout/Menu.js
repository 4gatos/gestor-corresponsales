import React from 'react';
import MenuTab from './MenuTab';
import { Link } from 'react-router-dom';
import MenuSubTab from './MenuSubTab';

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

const Menu = () => {
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
              <MenuSubTab link="/gestor/usuario/nuevo-usuario" text="Añadir usuario" />
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
          <MenuTab icon="icon-lens" text="Grupo de investigación" link="/gestor/grupo-de-investigacion" urls={investigationUrls} />
          <MenuTab icon="icon-historical-frame" text="Marco histórico" link="/gestor/marco-historico" urls={historicUrls} />
          <MenuTab icon="icon-media" text="Medios" link="/gestor/medios" urls={mediaUrls} />
        </ul>
      </div>
    </div>
  );
};

export default Menu;