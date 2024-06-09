import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";

import "./Profile.scss";
//import '../components/FeaturedProperties.css'
import axios from "axios";
import { fadeIn, staggerContainer } from "../utils/motion";

const Profile = () => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  // const userName = localStorage.getItem('userName')

  useEffect(() => {
    localStorage.removeItem("propertyId");
    localStorage.removeItem("selectedHouse");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("sessionToken");
    axios
      .get(`https://backend.kejaspace.com/profile/${userId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        // console.log(response);
        const userDetails = response.data.userDetails;
        setUserDetails(userDetails);
        const propertyDetails = response.data.propertyDetails;
        setPropertyDetails(propertyDetails);
        console.log("My properties", propertyDetails);
        // setPropOwner(propertyDetails[0].userId)
        // console.log('User details', userDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const dummyImage =
    "/images/ralph-ravi-kayden-mR1CIDduGLc-unsplash_d06c8bcd5110495c926a7afca70ae57e.jpg";

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="wrapper-container"
      >
        <h1>My Profile</h1>
        <div className="container">
          <motion.div
            className={`user-info ${scrolled ? "scrolled" : ""} ${
              scrolled ? "shadow-bounce" : ""
            }`}
            initial={{ backgroundColor: "transparent", top: "7rem" }}
            animate={{
              backgroundColor: scrolled ? "#04064d" : "transparent",
              top: scrolled ? "4rem" : "7rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="left">
              <div className="property-image">
                <img src={propertyDetails[0]?.profilePic} alt="none" />
              </div>
              <div className="user-details">
                <h4>
                  {userDetails.firstName} {userDetails.lastName}
                </h4>
                <h6>
                  <MdEmail /> {userDetails.email}
                </h6>
              </div>
            </div>
            <hr />
            <Link to="/addproperty" className="btn-primary">
              Add Property
            </Link>
          </motion.div>
          {/* <Link to={'/addproperty'} className='btn btn-primary'>
          Add Property
        </Link> */}

          <div className="propertyCard">
            {/* <motion.h2 variants={fadeIn("right", "tween", 0.5, 1)}>
              My Properties
      </motion.h2>*/}
            {propertyDetails.map((property) => (
              <div className="propertyInnerCard" key={property.propertyId}>
                <img src={property.profilePic} alt={property.propertyTitle} />
                <p>{property.propertyTitle}</p>
                <div className="buttons d-flex justify-content-center gap-4">
                  <Link
                    to={{
                      pathname: `/viewproperty/${property.propertyId}`,
                    }}
                    className="btn btn-secondary"
                  >
                    <span className="text-decoration-none">
                      <small>View </small>
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  </Link>
                  <Link
                    to={{
                      pathname: `/profile/deleteproperty/${property.propertyId}`,
                    }}
                    className="btn btn-danger"
                  >
                    <span>
                      <small>Delete </small>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
