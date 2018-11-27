import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Basics/Icon';

const MenuTab = ({ icon, text, link }) => {
  return (
    <li className="menu-tab">
      <Link to={link}>
        <Icon icon={icon} />
        <span className="tab-text">{text}</span>
      </Link>
    </li>
  );
};

export default MenuTab;