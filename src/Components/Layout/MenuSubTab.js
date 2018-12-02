import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuSubTab = ({ link, text }) => {
  return (
    <li>
      <NavLink to={link} activeClassName="active">
        <span className="tab-text">{text}</span>
      </NavLink>
    </li>
  );
};

export default MenuSubTab;