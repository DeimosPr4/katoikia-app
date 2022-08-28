import React from 'react';

export const AppFooter = (props) => {
  return (
    <div className="layout-footer">
      <img
        src={
          props.layoutColorMode === 'light'
            ? 'images/deimos-logo.png'
            : 'assets/layout/images/logo-white.svg'
        }
        alt="Logo"
        height="40"
        className="mr-2"
      />
      por
      <span className="font-medium ml-2">Deimos</span>
    </div>
  );
};
