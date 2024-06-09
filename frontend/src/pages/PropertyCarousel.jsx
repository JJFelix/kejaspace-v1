import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./PropertyCarousel.scss";

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { staggerContainer, fadeIn, slideIn } from "../utils/motion";

const PropertyCarousel = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://backend.kejaspace.com/coureselImages"
        );
        console.log("Fetched properties:", response.data);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [properties.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? properties.length - 1 : prevIndex - 1
    );
  };

  const handleMoreInfo = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  const variants = {
    enter: {
      opacity: 0,
      scale: 0.8,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="mainWrapper"
    >
      {properties.length > 0 ? (
        <motion.div className="carousel-container">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              className="carousel"
              key={currentIndex}
              custom={currentIndex}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
            >
              <motion.div className="property-card">
                <img
                  src={properties[currentIndex].propertypic}
                  alt={properties[currentIndex].propertyTitle}
                />
                <motion.div className="text">
                  <motion.div
                    variants={slideIn("left", "tween", 0.5, 1)}
                    className="left"
                  >
                    <motion.h1 variants={fadeIn("down", "tween", 0.9, 1)}>
                      {properties[currentIndex].propertyTitle}
                    </motion.h1>
                    <h3>{properties[currentIndex].propertyType}</h3>
                    <h6>
                      <span>
                        <FaLocationDot />
                      </span>{" "}
                      {properties[currentIndex].mainLocation},
                      {properties[currentIndex].subLocation}
                    </h6>
                  </motion.div>

                  <motion.div className="right">
                    <motion.h1 variants={fadeIn("down", "tween", 2, 1)}>
                      Keja Space
                    </motion.h1>
                    <p>
                      Find your perfect home with Keja Space! Affordable,
                      quality housing solutions tailored to your needs. Discover
                      your dream space today!
                    </p>
                  </motion.div>
                </motion.div>

                <button
                  className="more-info-btn"
                  onClick={() =>
                    handleMoreInfo(properties[currentIndex].propertyId)
                  }
                >
                  More Info
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <button className="prev-btn" onClick={handlePrev}>
            <GrPrevious />
          </button>
          <button className="next-btn" onClick={handleNext}>
            <GrNext />
          </button>
        </motion.div>
      ) : (
        <div style={{ color: "red" }} className="alert">
          <h1>
            <strong>Still Loading Properties ........!!</strong>
          </h1>
          <p>
            <strong>Please wait or Check Your Internet Connection</strong>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyCarousel;
