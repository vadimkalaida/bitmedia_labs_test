import React from 'react';
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";

interface ILayoutProps {
  children?: React.ReactNode
}

const LayoutComponent : React.FC<ILayoutProps> = ({ children }) => {
  return(
    <>
      <HeaderComponent />
      { children }
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;