import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Basics/Icon';

const MenuTab = ({ icon, text, link, children, urls }) => {
  return (
    <li className="menu-tab">
      <NavLink to={link} className={urls.indexOf(window.location.pathname) > -1 ? 'current' : ''}>
        <Icon icon={icon} />
        <span className="tab-text">{text}</span>
      </NavLink>
      {urls.indexOf(window.location.pathname) > -1 && children}
    </li>
  );
};

export default MenuTab;