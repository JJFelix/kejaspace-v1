import React, { useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [isNavVisible, setIsNavVisible] = useState(false);

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
  const profileImage = "image.png"; // '/images/profile.jpeg'
  getLocalStorageData("userName");

  return (
    <div>
      <nav className="nav">
        <div className="name-logo">
          <img
            src={profileImage}
            className="profile-image"
            alt="profile-image"
          />
          KejaSpace
        </div>

        <div className="below-500">
          <ul className="nav-list">
            <Link to={"/"} className="nav-links ">
              Home
            </Link>
            {userName && (
              <Link to={"/profile"} className="nav-links">
                You
              </Link>
            )}
            <Link to={"#"} className="nav-links">
              About
            </Link>
            <Link to={"#"} className="nav-links">
              Contact us
            </Link>
          </ul>

          <>
            {!userName && (
              <div className="auth-list">
                <Link to={"/register"} className="auth-links">
                  Register
                </Link>
                <Link to={"/login"} className="auth-links">
                  Login
                </Link>
              </div>
            )}
            {userName && (
              <div className="auth-list">
                <Link
                  to={"/login"}
                  onClick={handleLogout}
                  className="auth-links"
                >
                  Logout
                </Link>
              </div>
            )}
          </>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
