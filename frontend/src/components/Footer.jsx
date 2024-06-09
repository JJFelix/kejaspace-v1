import React from "react";
import "./Footer.scss";
import "../assets/react.svg";
import { Link } from "react-router-dom";
function Footer() {
  //const profileImage = "/images/profile.jpeg";
  return (
    <footer>
      <div className="footer-content">
        <div className="top">
          <div className="footerLogo">
            <img src="/image.png" alt="Logo" />
            <h1>kejaSpace</h1>
          </div>

          <div className="footer-social">
            <Link to={"https://facebook.com/KejaSpace"}>
              <i className="fab fa-facebook"></i>
            </Link>
            <Link to={"https://twitter.com/KejaSpace"}>
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to={"https://instagram.com/KejaSpace"}>
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="div">
            <h4>About</h4>
            <nav>
              <Link to={"/home"} className={"nav-link"}>
                Home
              </Link>

              <Link to={"/about"} className={"nav-link"}>
                About
              </Link>

              <Link to={"/contact"} className={"nav-link"}>
                Contact
              </Link>

              <Link to={"/policy"} className={"nav-link"}>
                Policy
              </Link>
            </nav>
          </div>

          <div className="div">
            <h4>Blogs</h4>
            <nav>
              <Link to={"/about"} className={"nav-link"}>
                About
              </Link>

              <Link to={"/contact"} className={"nav-link"}>
                Contact
              </Link>

              <Link to={"/policy"} className={"nav-link"}>
                Policy
              </Link>
            </nav>
          </div>

          <div className="div">
            <h4>Contact</h4>
            <nav>
              <Link to={"/about"} className={"nav-link"}>
                About
              </Link>

              <Link to={"/contact"} className={"nav-link"}>
                Contact
              </Link>

              <Link to={"/policy"} className={"nav-link"}>
                Policy
              </Link>
            </nav>
          </div>
          <div className="div">
            <h4>Policy</h4>
            <nav>
              <Link to={"/about"} className={"nav-link"}>
                Privacy
              </Link>

              <Link to={"/contact"} className={"nav-link"}>
                Terms & Conditions
              </Link>

              <Link to={"/policy"} className={"nav-link"}>
                Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="maq">
          <marquee>&copy; Keja Space</marquee>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
