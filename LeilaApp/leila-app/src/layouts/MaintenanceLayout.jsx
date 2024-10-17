import React from 'react';

import { Outlet } from 'react-router-dom';
import MaintenanceNavbar from '../MaintenanceNavbar';


function MaintenanceLayout() {
  return (
    <>
    <MaintenanceNavbar />
    <Outlet/>
    </>
    
  );
}

export default MaintenanceLayout;
