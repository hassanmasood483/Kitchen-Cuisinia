import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import "../componentsCSS/sideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/add-item" className="sidebar-option">
            <img src={assets.add_icon} alt="add" />
            <p>Add Items</p>
          </NavLink>

          <NavLink to="/items-list" className="sidebar-option">
            <img src={assets.order_icon} alt="list" />
            <p>List Items</p>
          </NavLink>

          <NavLink to="/orders" className="sidebar-option">
            <img src={assets.order_icon} alt="orders" style={{width: '22px'}} />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideBar;
