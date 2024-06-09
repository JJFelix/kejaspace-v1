import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./PropertyViewDetails.scss";
import { fadeIn, staggerContainer } from "../utils/motion";

const PropertyViewDetails = () => {
  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `https://backend.kejaspace.com/viewProperty/${propertyId}`
        );
        setPropertyDetails(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!propertyDetails) {
    return (
      <h3
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "18px",
          height: "70vh",
        }}
      >
        The Property you are looking for is not available....
      </h3>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="property-details"
    >
      <motion.div variants={fadeIn("up", "tween", 0.5, 1)} className="top">
        <h1>Property Details</h1>
        <h5>Keja Space Offers Delectable Housing Services</h5>
      </motion.div>
      {propertyDetails.map((property) => (
        <motion.div key={property.houseId} className="property-info">
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1)}
            className="left"
          >
            <h2>Images</h2>
            <div className="images-grid">
              {property.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className={`property-image ${
                    index === 0 ? "first-image" : ""
                  } ${selectedImage === index ? "selected" : ""}`}
                  onClick={() => setSelectedImage(index)}
                  initial={{ scale: 1 }}
                  animate={{ scale: selectedImage === index ? 1.5 : 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.3, 1)}
            className="right"
          >
            <div className="price">
              <h2>Ksh {property.price}</h2>

              <strong>Per Month</strong>
              <br />

              <button>Call</button>
            </div>
            <p>
              <strong>House ID:</strong> {property.houseId}
            </p>
            <p>
              <strong>House Type:</strong> {property.houseType}
            </p>
            <p>
              <strong>House Category:</strong> {property.houseCategory}
            </p>

            <p>
              <strong>Description:</strong> {property.description}
            </p>
            <p>
              <strong>Owner ID:</strong> {property.ownerId}
            </p>
          </motion.div>
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="overlay"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={propertyDetails[0].images[selectedImage]}
              alt={`Selected Property Image ${selectedImage + 1}`}
              className="selected-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PropertyViewDetails;
