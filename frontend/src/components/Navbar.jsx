import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export const getLocalStorageData = (key) => {
  const expirationTime = localStorage.getItem(key + "_ts");
  if (expirationTime && Date.now() > expirationTime) {
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_ts");
    return null; // Data expired
  }
  return localStorage.getItem(key);
};

const NavBar = () => {
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    const sessionToken = localStorage.getItem("sessionToken");
    console.log(`User Id: ${userId}, sessionTokne: ${sessionToken}`);
    // localStorage.removeItem("sessionToken")
    // localStorage.removeItem('userId')

    axios
      .get(`https://backend.kejaspace.com/logout/${userId}`, {
        headers: {
          authorization: sessionToken,
        },
      })
      .then((response) => {
        console.log("logged out");
        window.location.reload(true);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userName" + "_ts");
    localStorage.removeItem("propertyId");
  };

  const userName = localStorage.getItem("userName");

  getLocalStorageData("userName");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.header>
        <motion.div className="container">
          <motion.nav
            className={`navbar ${scrolled ? "scrolled" : ""} ${
              scrolled ? "shadow-bounce" : ""
            }`}
            initial={{ backgroundColor: "transparent", top: "20px" }}
            animate={{
              backgroundColor: scrolled ? "#04064d" : "transparent",
              top: scrolled ? "0" : "20px",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="leftBar">
              <div className="menu-icon" onClick={toggleNavbar}>
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    &#x2715; {/* Close icon */}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    &#9776; {/* Hamburger icon */}
                  </motion.div>
                )}
              </div>

              <div className="logo">
                <img src="/image.png" className="profile-image" alt="Logo" />
                <h1>kejaSpace</h1>
              </div>
            </div>

            <div className="search">
              <input type="text" name="search" className="search" />

              <Link>
                <IoSearch />
              </Link>
            </div>

            <motion.ul
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -500 }}
              transition={{ duration: 0.5 }}
              className="nav"
            >
              <Link
                to={"/"}
                className="navLink active"
                onClick={handleLinkClick}
              >
                <p>Home</p>
              </Link>
              {userName && (
                <Link
                  to={"/profile"}
                  className="navLink active"
                  onClick={handleLinkClick}
                >
                  <p>Profile</p>
                </Link>
              )}
              <Link
                to={"/"}
                className="navLink active"
                onClick={handleLinkClick}
              >
                <p>About Us</p>
              </Link>
              <Link
                to={"/"}
                className="navLink active"
                onClick={handleLinkClick}
              >
                <p>Blogs</p>
              </Link>
            </motion.ul>

            <div className="navItem">
              {!userName && (
                <div className="regLogo">
                  <Link to={"/register"} className="navLink">
                    <span>
                      <FaUser />
                    </span>{" "}
                    Register{" "}
                  </Link>
                  <Link to={"/login"} className="navLink">
                    <span>
                      <FiLogIn />
                    </span>
                    Login{" "}
                  </Link>
                </div>
              )}
              {userName && (
                <Link
                  to={"/login"}
                  onClick={handleLogout}
                  className="navLink active"
                >
                  <span>
                    <MdLogout />
                  </span>{" "}
                  Logout
                </Link>
              )}
            </div>
          </motion.nav>
        </motion.div>
      </motion.header>
      {error && (
        <div className="alert alert-danger register-form">
          <p className="danger">Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default NavBar;
