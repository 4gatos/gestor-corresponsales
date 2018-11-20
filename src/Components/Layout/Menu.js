import React from 'react';
import MenuTab from './MenuTab';

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-wrapper">
        <ul className="menu-list">
          <MenuTab />
        </ul>
      </div>
    </div>
  );
};

export default Menu;