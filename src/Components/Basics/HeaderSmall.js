import React from 'react';
import Icon from './Icon';

const HeaderSmall = ({ icon, title, subtitle }) => {
  return (
    <div className="header">
      <h1>
        <Icon icon={icon} />
        {title}
      </h1>
      <p className="subtitle">
        {subtitle}
      </p>
    </div>
  );
};

export default HeaderSmall;