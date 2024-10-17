import React from 'react';
import AdminNavbar from '../AdminNavbar';
import { Outlet } from 'react-router-dom';


function AdminLayout() {
  return (
    <>
    <AdminNavbar />
    <Outlet/>
    </>
    
  );
}

export default AdminLayout;
