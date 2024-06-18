import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages/Property.css";
import Carousel from "react-bootstrap/Carousel";
import call from "/images/call.png";

const ViewUnit = () => {
  const { propertyId, houseId } = useParams();
  const [allUnits, setAllUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // console.log(`Prop Id: ${propertyId}, HouseId: ${houseId}`);

  useEffect(() => {
    axios
      .get(`https://backend.kejaspace.com/${propertyId}`)
      .then((response) => {
        const unitData = response.data.find(
          (h) => h.houseId === parseInt(houseId, 10)
        );
        setAllUnits(unitData || {});
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching unit details:", error);
        setError("Failed to fetch unit details. Please try again.");
        setLoading(false)
      });
  }, [propertyId, houseId]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Contact copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  // console.log("allUnits: ", allUnits);

  if (error) {
    return <div className="main-wrapper">{error}</div>;
  }

  if (loading) {
    return <div className="main-wrapper">Loading...</div>;
  }

  return (
    <div className="main-wrapper">
      {/* <h2>VIEW UNIT</h2> */}
      <h2>{allUnits?.propertyTitle}</h2>
      <div className="house-card">
        <div className="house">
          <div className="info-1">
            <div className="img-container">
              <Carousel fade>
                {allUnits?.housePics.map((image, index) => (
                  <Carousel.Item key={index} className="house-image">
                    <img src={image} alt="" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="cate-desc">
              <h3>{allUnits?.houseCategory}</h3>
              <p>{allUnits?.description}</p>
            </div>
          </div>

          <div className="info-2 border m-auto">
            <h4 className="border-bottom">BASIC INFO</h4>
            <div className="basic-info border-bottom">
              <p>
                <strong>Price:</strong>{" "}
                <i className="fa-solid fa-hand-holding-dollar"></i> Ksh.{" "}
                {allUnits?.price}
              </p>
              <p>
                <strong>Size:</strong> {}
                <i className="fa fa-cube" aria-hidden="true"></i>{" "}
                {allUnits?.sizeOfUnit} sq.ft
              </p>
              <p>
                {/* <i className="fa fa-list-ol" aria-hidden="true"></i> {" "}{" "} */}
                {allUnits?.availableUnits} available units
              </p>
              <p>
                <strong>Level:</strong> {allUnits?.unitLevel} floor
              </p>
            </div>

            <h4 className="border-bottom">AMENITIES</h4>
            <div className="amenities">
                  <div>
                    {allUnits?.amenities.numberofBedrooms !== "" && (
                      <p>
                        <strong>Bedrooms</strong>{" "}
                        <i className="fa fa-bed" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.numberofBedrooms} 
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.wardrobe !== "" && (
                      <p>
                        <strong>Wardrobe</strong>{" "}
                        <i className="fa fa-th-large" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.wardrobe}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.numberofBathrooms !== "" && (
                      <p>
                        <strong>Bathrooms</strong>{" "}
                        <i className="fa fa-bath" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.numberofBathrooms} 
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.numberOfToilets !== "" && (
                      <p>
                        {" "}
                        <strong>Toilets</strong>:{" "}
                        {allUnits?.amenities.numberOfToilets}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.water !== "" && (
                      <p>
                        <strong>Water</strong>{" "}
                        <i className="fa fa-tint" aria-hidden="true"></i>: Ksh.{" "}
                        {allUnits?.amenities.water} per unit
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.electricity !== "" && (
                      <p>
                        <strong>Electricity</strong>{" "}
                        <i className="fa fa-lightbulb" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.electricity}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.security !== "" && (
                      <p>
                        <strong>Security</strong>{" "}
                        <i className="fa fa-male" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.security}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.cctv !== "" && (
                      <p>
                        <strong>CCTV</strong>{" "}
                        <i className="fa fa-television" aria-hidden="true"></i>:{" "}
                        {allUnits?.amenities.cctv}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.balcony !== "" && (
                      <p>
                        {" "}
                        <strong>Balcony</strong> : {allUnits?.amenities.balcony}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.kitchenCabinets !== "" && (
                      <p>
                        <strong>Kitchen Cabinets</strong>:{" "}
                        {allUnits?.amenities.kitchenCabinets}
                      </p>
                    )}
                  </div>

                  <div>
                    {allUnits?.amenities.garbageCollection !== "" && (
                      <p>
                        <strong>Garbage</strong>{" "}
                        <i className="fa fa-trash" aria-hidden="true"></i>: Ksh.
                        {allUnits?.amenities.garbageCollection}
                      </p>
                    )}
                  </div>
                </div>

            <div className="border-top">
              <div className=" align-items-center">
                {/* <h5 className="mx-auto">Call</h5> */}
                <img
                  className="mx-auto justify-content-center"
                  src={call}
                  alt="Call Icon"
                  onClick={() => handleCall(`0` + allUnits?.contact)}
                />
              </div>
              <h5
                className=""
                onClick={() => copyToClipboard(`0` + allUnits?.contact)}
              >
                Call {`0` + allUnits?.contact}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUnit;
