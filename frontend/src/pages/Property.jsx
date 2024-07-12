import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Property.css";
import Carousel from "react-bootstrap/Carousel";

const Property = () => {
  const [images, setImages] = useState([]);

  const { propertyId } = useParams();
  console.log("property id:", propertyId);
  const [houses, setHouses] = useState([]);
  const [propertyName, setPropertyName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [propertyLocation, setPropertyLocation] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("sessionToken");

    axios
      .post(
        "https://backend.kejaspace.com/addProperty",
        {
          name: propertyName,
          location: propertyLocation,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        // Store the property ID in local storage
        localStorage.setItem("propertyId", response.data.propertyId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // localStorage.removeItem("propertyId");
    // localStorage.removeItem("selectedHouse");
    const token = localStorage.getItem("sessionToken");
    axios
      .get(`https://backend.kejaspace.com/profile/${userId}/${propertyId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setHouses(Array.isArray(response.data) ? response.data : []);
        console.log("houses:", houses);
        setSuccess("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error(error.response.data.error);
          setError(error.response.data.error);
        } else {
          console.error(error);
          setError("An error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propertyId, userId]);

  {
    /*console.log("userId: ", userId);
  console.log("houses: ", houses);*/
  }
  const handleClickUpdate = (house) => {
    localStorage.setItem("propertyId", propertyId);
    localStorage.setItem("selectedHouse", JSON.stringify(house));

    navigate(`/viewproperty/${propertyId}`);
  };

  return (
    <div className="main-wrapper">
      <h2>YOUR UNITS</h2>
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

      {userId && loading && <p>Loading...</p>}

      {userId && (
        <span className="m-3 d-flex justify-content-center gap-5 bt">
          <Link to={`/addhouse/${propertyId}`} className="btn btn-primary">
            <span className="text-decoration-none">
              <small>Add Unit</small>
            </span>
          </Link>
          <Link to={`/profile`} className="btn btn-success">
            <span className="text-decoration-none">
              <small>Back to Profile</small>
            </span>
          </Link>
        </span>
      )}

      <div className="house-card">
        {loading ? (
          <p>Loading...</p>
        ) : Array.isArray(houses) && houses.length > 0 ? (
          houses.map((house, index) => (
            <div key={index} className="house">
              <div className="info-1">
                <div className="img-container">
                  {/* {house.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      className="house-image"
                      src={image}
                      alt={`House ${propertyId} Image ${imgIndex}`}
                    />
                  ))}
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Property ${propertyId} - Image ${index + 1}`}
                    />
                  ))} */}
                  <Carousel fade>
                  {house.images.map((image, index) => (
                    <Carousel.Item key={index} className="house-image">
                      <img src={image} alt="" />
                    </Carousel.Item>
                  ))}
                </Carousel>
                </div>

                <div className="cate-desc">
                  <h3>{house.propertyTitle}</h3>
                  <h3>{house.houseCategory}</h3>
                  <p>{house.description}</p>
                </div>
              </div>

              {/*<form onSubmit={handleSubmit}>
                  <label>
                    Property Category<br/> <h5> {house.houseCategory}</h5>
                  </label>
                  <label>
                    Property Location:
                    <input type="text" value={propertyLocation} onChange={e => setPropertyLocation(e.target.value)} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>*/}
              <div className="info-2 border m-auto">
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
                  {/* <ul style={{ listStyleType: "none" }}>
                    {house.amenities &&
                      Object.entries(house.amenities).map(([key, value]) =>
                        value ? (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        ) : null
                      )}
                  </ul> */}
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

                <div className="border-top d-flex justify-content-center gap-2">
                  <Link
                    to={`/profile/updateadvert/${house.houseId}`}
                    onClick={() => handleClickUpdate(house)}
                    className="btn btn-primary"
                  >
                    <span className="text-decoration-none">
                      <small>Update </small>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </span>
                  </Link>
                  <Link
                    to={`/profile/deletehouse/${house.houseId}`}
                    onClick={() => handleClickUpdate(house)}
                    className="btn btn-danger"
                  >
                    <span className="text-decoration-none">
                      <small>Delete </small>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No houses available</p>
        )}
      </div>
      <br />
      <button
        onClick={() => navigate("/profile")}
        className="btn btn-secondary mx-auto"
      >
        Back
      </button>
    </div>
  );
};

export default Property;
