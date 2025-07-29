import React from "react";
import "../componentsCSS/Navbar.css";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img className="logo" src={assets.logo} alt="Logo" />
      </div>
    </>
  );
};

export default Navbar;
