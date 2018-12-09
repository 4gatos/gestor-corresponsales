import React from 'react';

const Tip = ({ children }) => {
  return (
    <div className="tip">
      <p>
        {children}
      </p>
    </div>
  );
};

export default Tip;