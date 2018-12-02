import React from 'react';
import MenuTab from './MenuTab';
import { Link } from 'react-router-dom';
import MenuSubTab from './MenuSubTab';

const userUrls = [
  '/gestor/usuario',
  '/gestor/nuevo-usuario',
  '/gestor/usuarios',
];

const correspondantUrls = [
  '/gestor/nuevo-corresponsal',
  '/gestor/corresponsales',
];

const battlesUrls = [
  '/gestor/nueva-batalla',
  '/gestor/batallas',
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
          <MenuTab icon="icon-user" text="Usuario" link="/gestor/usuario" urls={userUrls}>
            <ul>
              <MenuSubTab link="/gestor/usuario" text="Cuenta" />
              <MenuSubTab link="/gestor/nuevo-usuario" text="Añadir usuario" />
              <MenuSubTab link="/gestor/usuarios" text="Usuario" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-feather" text="Corresponsales" link="/gestor/corresponsales" urls={correspondantUrls}>
            <ul>
              <MenuSubTab link="/gestor/nuevo-corresponsal" text="Añadir corresponsal" />
              <MenuSubTab link="/gestor/corresponsales" text="Editar corresponsales" />
            </ul>
          </MenuTab>
          <MenuTab icon="icon-swords" text="Batallas" link="/gestor/batallas" urls={battlesUrls}>
            <ul>
              <MenuSubTab link="/gestor/nueva-batalla" text="Añadir batalla" />
              <MenuSubTab link="/gestor/batallas" text="Editar batallas" />
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