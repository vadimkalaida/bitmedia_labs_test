import React from 'react';
import './HeaderComponent.scss';

const HeaderComponent : React.FC = () => {
  return(
    <div className="header">
      <div className="container headerContainer">
        <p className="headerLogo">
          AppCo
        </p>
      </div>
    </div>
  );
};

export default HeaderComponent;