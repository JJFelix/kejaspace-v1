import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddProperties = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [propertyData, setPropertyData] = useState({
    propertyTitle: "",
    propertyType: "",
    mainLocation: "",
    subLocation: "",
    distanceFromMainRoad: "",
    description: "",
    contact: "",
    profilePic: {
      picName: "",
      picContent: "base64",
    },
    amenities: {
      water: { selected: false },
      garbageCollection: { selected: false, pricePerMonth: "" },
      electricity: { selected: false },
      cctv: { selected: false },
      security: { selected: false },
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "profilePic") {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        setPropertyData({
          ...propertyData,
          profilePic: {
            picName: file.name,
            picContent: event.target.result.split(",")[1], // Extracting the base64 content
          },
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (type === "checkbox") {
      // Handle checkbox input
      setPropertyData({
        ...propertyData,
        amenities: {
          ...propertyData.amenities,
          [name]: {
            selected: checked,
            value: checked ? name : `no ${name}`,
          },
        },
      });
    } else {
      // Handle other input fields
      setPropertyData({
        ...propertyData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(propertyData);
    const token = localStorage.getItem("sessionToken");
    axios
      .post("https://backend.kejaspace.com/profile/addproperty", propertyData, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setSuccess("Property added successfully");
        setError(null);
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to add property. Please try again");
      });
  };

  return (
    <div className="property-container">
      <div>
        <h3>Add Property</h3>
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

      <div>
        <form className="property-form" onSubmit={handleSubmit}>
          <div className="div1">
            <div className="div1-1">
              <div className="inputContainer">
                <label htmlFor="propertyTitle" className="label">
                  Property Title
                </label>
                <input
                  name="propertyTitle"
                  value={propertyData.propertyTitle}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  aria-describedby="propertyTitle"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="propertyType" className="label">
                  Property Type
                </label>
                :
                <select
                  name="propertyType"
                  id="propertyType"
                  value={propertyData.propertyType}
                  onChange={handleInputChange}
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option> </option>
                  <option>Commercial</option>
                  <option>Residential</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div className="div1-2">
              <div className="inputContainer">
                <label htmlFor="mainLocation" className="label">
                  Main Location
                </label>
                <input
                  name="mainLocation"
                  value={propertyData.mainLocation}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="mainLocation"
                  aria-describedby="mainLocation"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="subLocation" className="label">
                  Sub Location
                </label>
                <input
                  name="subLocation"
                  value={propertyData.subLocation}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="subLocation"
                  aria-describedby="subLocation"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="distanceFromMainRoad" className="label">
                  Distance From Main Road
                </label>
                <input
                  name="distanceFromMainRoad"
                  value={propertyData.distanceFromMainRoad}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="distanceFromMainRoad"
                  aria-describedby="distanceFromMainRoad"
                />
              </div>
            </div>
          </div>
          <div className="div2">
            <div className="inputContainer">
              <label htmlFor="description" className="label">
                Description
              </label>
              <input
                name="description"
                value={propertyData.description}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="description"
                aria-describedby="description"
              />
            </div>
            <div className="checkbox-wrapper">
              <h4>Amenities</h4>
              <div className="checkbox">
                <input
                  name="water"
                  type="checkbox"
                  checked={propertyData.amenities.water.selected}
                  onChange={handleInputChange}
                  className="form-check-input"
                  id="water"
                />
                <label htmlFor="water">Water</label>
              </div>

              <div className="checkboxCont">
                <div>
                  <input
                    name="garbageCollection"
                    type="checkbox"
                    checked={propertyData.amenities.garbageCollection.selected}
                    onChange={handleInputChange}
                    className="form-check-input"
                    id="garbageCollection"
                  />
                  <label htmlFor="water">Garbage Collection</label>
                </div>
                <div>
                  <label htmlFor="">Price Per Month</label>
                  <span>
                    <input
                      name="garbageCollection"
                      value={
                        propertyData.amenities.garbageCollection.pricePerUnit
                      }
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                      id="garbageCollection"
                      aria-describedby="garbageCollection"
                    />
                  </span>
                </div>
              </div>

              <div className="checkbox">
                <input
                  name="electricity"
                  type="checkbox"
                  checked={propertyData.amenities.electricity.selected}
                  onChange={handleInputChange}
                  className="form-check-input"
                  id="electricity"
                />
                <label htmlFor="water">Electricity</label>
              </div>

              <div className="checkbox">
                <input
                  name="cctv"
                  type="checkbox"
                  checked={propertyData.amenities.cctv.selected}
                  onChange={handleInputChange}
                  className="form-check-input"
                  id="cctv"
                />
                <label htmlFor="cctv">CCTV</label>
              </div>

              <div className="checkbox">
                <input
                  name="security"
                  type="checkbox"
                  checked={propertyData.amenities.security.selected}
                  onChange={handleInputChange}
                  className="form-check-input"
                  id="security"
                />
                <label htmlFor="security">Security</label>
              </div>
            </div>
          </div>
          <div className="div3">
            <div className="inputContainer">
              <label htmlFor="contact" className="label">
                Contact
              </label>
              <input
                name="contact"
                value={propertyData.contact}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="contact"
                aria-describedby="contact"
              />
            </div>
            <div className="inputCont">
              <label htmlFor="profilePic" className="label">
                Profile Picture
              </label>
              <input
                name="profilePic"
                onChange={handleInputChange}
                type="file"
                className="form-control"
                id="profilePic"
                aria-describedby="profilePic"
              />
            </div>
          </div>

          <button type="submit" className=" button btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
