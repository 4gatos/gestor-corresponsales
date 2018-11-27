import React from 'react';
import MenuTab from './MenuTab';

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-wrapper">
        <div className="logo">
          <img src="./img/logo.png" alt="CEU"/>
        </div>
        <ul className="menu-list">
          <MenuTab icon="icon-user" text="Usuario" link="/gestor/usuario" />
          <MenuTab icon="icon-feather" text="Corresponsales" link="/gestor/usuario" />
          <MenuTab icon="icon-swords" text="Batallas" link="/gestor/usuario" />
          <MenuTab icon="icon-lens" text="Grupo de investigación" link="/gestor/usuario" />
          <MenuTab icon="icon-historical-frame" text="Marco histórico" link="/gestor/usuario" />
          <MenuTab icon="icon-media" text="Medios" link="/gestor/usuario" />
        </ul>
      </div>
    </div>
  );
};

export default Menu;