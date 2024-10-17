import React from 'react';
import { Outlet } from 'react-router-dom';
import SecurityNavbar from '../SecurityNavbar';


function SecurityLayout() {
  return (
    <>
    <SecurityNavbar />
    <Outlet/>
    </>
    
  );
}

export default SecurityLayout;
