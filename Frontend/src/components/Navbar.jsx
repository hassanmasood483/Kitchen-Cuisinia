import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import "../componentCSS/Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { cartItems, token, setToken } = useContext(StoreContext);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Hamburger menu state
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const cartCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + (qty > 0 ? qty : 0),
    0
  );

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileDropdown(false);
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Hamburger menu toggle
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    if (isHomePage) {
      setIsNavbarHidden(false);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".navbar-profile")) {
        setShowProfileDropdown(false);
      }
      if (
        showMobileMenu &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-icon")
      ) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown, showMobileMenu]);

  return (
    <>
      <div
        className={`navbar ${isNavbarHidden ? "navbar-hidden" : ""} ${
          isHomePage ? "navbar-home" : ""
        }`}
      >
        <div className="navbar-left">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="logo" />
          </Link>
          <span className="navbar-title">Kitchen Cuisinia</span>
        </div>
        {/* Desktop NavLinks */}
        <div className="navbar-center">
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
          <NavLink to="/menu" className="nav-link">
            Menu
          </NavLink>
          <a href="#footer" className="nav-link">
            Contact Us
          </a>
        </div>
        <div className="nav-right">
          <div className="nav-search-icon" style={{ position: "relative" }}>
            <NavLink to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign Up</button>
          ) : (
            <div className="navbar-profile">
              <img
                src={assets.profile_icon}
                alt="profile"
                onClick={toggleProfileDropdown}
                style={{ cursor: "pointer" }}
              />
              <ul
                className={`profile-dropdown ${
                  showProfileDropdown ? "show" : ""
                }`}
              >
                <li
                  onClick={() => {
                    navigate("/orders");
                    setShowProfileDropdown(false);
                  }}
                >
                  <img src={assets.bag_icon} alt="Bag" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
          {/* Hamburger icon for mobile */}
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <NavLink
            to="/"
            className="nav-link"
            end
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className="nav-link"
            onClick={() => setShowMobileMenu(false)}
          >
            Menu
          </NavLink>
          <a
            href="#footer"
            className="nav-link"
            onClick={() => setShowMobileMenu(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;