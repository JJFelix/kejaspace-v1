import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Property.css";
import call from "/images/call.png";
import Carousel from "react-bootstrap/Carousel";

const ViewHouses = (property) => {
  const { images, location, isVacant, contact } = property;

  const { propertyId } = useParams();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    axios
      .get(`https://backend.kejaspace.com/${propertyId}`)
      .then((response) => {
        {
          /* console.log(response.data)*/
        }
        setHouses(response.data);
        {
          /* console.log('houses:', houses)*/
        }
        setSuccess("");
      })
      .catch((error) => {
        console.error(error.response.data.error);
        setError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propertyId]);

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

  return (
    <div className="main-wrapper">
      <div>
        <h2>UNITS</h2>
      </div>
      {error && (
        <div className="alert alert-danger register-form">
          <p className="danger">{error}</p>
        </div>
      )}
      {success && (
        <div className="alert alert-success register-form">
          <p>{success}</p>
        </div>
      )}

      <div className="house-card">
        {houses == !0 && loading ? (
          <p>Loading...</p>
        ) : (
          houses.map((house, index) => (
            <div key={index} className="house">
              <div className="info-1">
                <div className="img-container">
                <Carousel fade>
                  {house.housePics.map((image, index) => (
                    <Carousel.Item key={index} className="house-image">
                      <img src={image} alt="" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                </div>

                <div className="cate-desc">
                  <h3>{house.houseCategory}</h3>
                  <p>{house.description}</p>
                </div>
              </div>

              <div className="info-2 border m-auto">
              <h4 className="border-bottom">BASIC INFO</h4>

                <div className="basic-info border-bottom">
                  <p>
                    <strong>Price:</strong>{" "}
                    <i className="fa-solid fa-hand-holding-dollar"></i> Ksh.{" "}
                    {house.price}
                  </p>
                  <p>
                    <strong>Size:</strong> {}
                    <i className="fa fa-cube" aria-hidden="true"></i>{" "}
                    {house.sizeOfUnit} sq.ft
                  </p>
                  <p>
                    {/* <i className="fa fa-list-ol" aria-hidden="true"></i> {" "}{" "} */}
                    {house.availableUnits} available units
                  </p>
                  <p>
                    <strong>Level:</strong> {house.unitLevel} floor
                  </p>
                </div>

                <h4 className="border-bottom">AMENITIES</h4>
                <div className="amenities">
                  <div>
                    {house.amenities.numberofBedrooms !== "" && (
                      <p>
                        <strong>Bedrooms</strong>{" "}
                        <i className="fa fa-bed" aria-hidden="true"></i>:{" "}
                        {house.amenities.numberofBedrooms} 
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.wardrobe !== "" && (
                      <p>
                        <strong>Wardrobe</strong>{" "}
                        <i className="fa fa-th-large" aria-hidden="true"></i>:{" "}
                        {house.amenities.wardrobe}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.numberofBathrooms !== "" && (
                      <p>
                        <strong>Bathrooms</strong>{" "}
                        <i className="fa fa-bath" aria-hidden="true"></i>:{" "}
                        {house.amenities.numberofBathrooms} 
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.numberOfToilets !== "" && (
                      <p>
                        {" "}
                        <strong>Toilets</strong>:{" "}
                        {house.amenities.numberOfToilets}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.water !== "" && (
                      <p>
                        <strong>Water</strong>{" "}
                        <i className="fa fa-tint" aria-hidden="true"></i>: Ksh.{" "}
                        {house.amenities.water} per unit
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.electricity !== "" && (
                      <p>
                        <strong>Electricity</strong>{" "}
                        <i className="fa fa-lightbulb" aria-hidden="true"></i>:{" "}
                        {house.amenities.electricity}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.security !== "" && (
                      <p>
                        <strong>Security</strong>{" "}
                        <i className="fa fa-male" aria-hidden="true"></i>:{" "}
                        {house.amenities.security}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.cctv !== "" && (
                      <p>
                        <strong>CCTV</strong>{" "}
                        <i className="fa fa-television" aria-hidden="true"></i>:{" "}
                        {house.amenities.cctv}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.balcony !== "" && (
                      <p>
                        {" "}
                        <strong>Balcony</strong> : {house.amenities.balcony}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.kitchenCabinets !== "" && (
                      <p>
                        <strong>Kitchen Cabinets</strong>:{" "}
                        {house.amenities.kitchenCabinets}
                      </p>
                    )}
                  </div>

                  <div>
                    {house.amenities.garbageCollection !== "" && (
                      <p>
                        <strong>Garbage</strong>{" "}
                        <i className="fa fa-trash" aria-hidden="true"></i>: Ksh.
                        {house.amenities.garbageCollection}
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
                      onClick={() => handleCall(house.contact)}
                    />
                  </div>
                  <h5
                    className=""
                    onClick={() => copyToClipboard(house.contact)}
                  >
                    Call {house.contact}
                  </h5>
                </div>

                {/* {house.amenities && Object.keys(house.amenities).length > 0 && (
                  <div className="m-3 border-bottom">
                    <h5>Amenities</h5>
                    <ul style={{ listStyleType: "none" }}>
                      {Object.entries(
                        typeof house.amenities === "string"
                          ? JSON.parse(house.amenities)
                          : house.amenities
                      )
                        .filter(
                          ([key, value]) =>
                            value && value !== "no" && value !== "Not provided"
                        )
                        .map(([key, value]) => (
                          <li key={key}>
                            <strong>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong>{" "}
                            {typeof value === "object"
                              ? Object.entries(value).map(
                                  ([nestedKey, nestedValue]) => (
                                    <span key={nestedKey}>
                                      {nestedKey.charAt(0).toUpperCase() +
                                        nestedKey.slice(1)}{" "}
                                      : {nestedValue}{" "}
                                    </span>
                                  )
                                )
                              : value}
                          </li>
                        ))}
                    </ul>
                  </div>
                )} */}

                {/* <div>
                  <div className=" align-items-center">
                    <h5 className="mx-auto">Call</h5>
                    <img
                      className="mx-auto justify-content-center"
                      src={call}
                      alt="Call Icon"
                      onClick={() => handleCall(house.contact)}
                    />
                  </div>
                  <h5
                    className=""
                    onClick={() => copyToClipboard(house.contact)}
                  >
                    {house.contact}
                  </h5>
                </div> */}
              </div>

              {/*{userId == house.ownerId &&                        
                (<div className='d-flex justify-content-center gap-2'>
                  <Link to={`/profile/updateadvert/${house.houseId}`} onClick={handleClickUpdate} className='btn btn-primary'>
                    <span className='text-decoration-none'>
                        <small>Update </small><i className="fa-regular fa-pen-to-square"></i>
                    </span>
                  </Link>
                  <Link to={`/profile/deletehouse/${house.houseId}`} onClick={handleClickUpdate} className='btn btn-danger'>
                    <span className='text-decoration-none'>
                        <small>Delete </small><i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                  </Link>   
                </div>)
              }*/}
            </div>
          ))
        )}
      </div>
      <button
        type="button"
        className="button mb-2 btn btn-secondary mx-auto "
        onClick={handleBackClick}
      >
        Back
      </button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Zoomed House"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHouses;
