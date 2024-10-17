import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {Link} from "react-router-dom";
import { auth } from "./firebase";
function AdminNavbar() {
  let [mobile, setMobile] = useState(false);
  const showNavbar = () => {
    setMobile(!mobile);
  };
  const handleLogout = async (e) => {
    try {
      await auth.signOut();
      console.log("signed out")
      window.location.href="/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <h2>كمبوند ليلة</h2>
      <nav className ={mobile == true? "responsive_nav": ""}>
        <CustomLink href="/admin" onClick={showNavbar}>سجل الشكاوي</CustomLink>
        <CustomLink href={handleLogout} onClick={handleLogout}>تسجيل خروج</CustomLink>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

function CustomLink({href, children, ...props}){
  const path = window.location.pathname;
  return(<Link to={href} {...props} className={path === href? "active btn btn-outline btn-lg":"btn btn-outline btn-lg"}>{children}</Link>)
      
}

export default AdminNavbar;
