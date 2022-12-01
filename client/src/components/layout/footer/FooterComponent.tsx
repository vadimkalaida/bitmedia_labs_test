import React from 'react';
import './FooterComponent.scss'

const FooterComponent : React.FC = () => {
  return(
    <div className="footer">
      <div className="container footerContainer">
        <p className="footerLogo">AppCo</p>
        <p className="footerText">
          All rights reserved by ThemeTags
        </p>
        <p className="footerText">
          Copyrights © { new Date().getFullYear() }.
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;