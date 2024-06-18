import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Profile.css";
import "../components/FeaturedProperties.css";
import UploadRequisitionForm from "../admin/UploadRequisitionForm";

const Profile = () => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newUserId, setNewUserId] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("propertyManager");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    localStorage.removeItem("propertyId");
    localStorage.removeItem("selectedHouse");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      setError("No authorization token found. Please log in again.");
      setLoading(false);
      return;
    }
    console.log("UserId", userId);

    axios
      .get(`https://backend.kejaspace.com/profile/${userId}`, {
        headers: { authorization: token },
      })
      .then((response) => {
        const userDetails = response.data.userDetails || {};
        setUserDetails(userDetails);
        console.log("userDetails", userDetails);
        const propertyDetails = response.data.propertyDetails || [];
        setPropertyDetails(propertyDetails);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        if (error.response) {
          setError(
            `Error: ${error.response.data.error || error.response.statusText}`
          );
        } else if (error.request) {
          setError("No response received from server.");
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      });
  }, []);

  const handleGrantRights = async (e) => {
    e.preventDefault();

    const url =
      newUserRole === "propertyManager"
        ? "https://backend.kejaspace.com/propertyManager"
        : "https://backend.kejaspace.com/registerAgent";

    const payload = { userId: newUserId, email: newUserEmail };

    try {
      const response = await axios.post(url, payload, {
        headers: { authorization: localStorage.getItem("sessionToken") },
      });

      if (response.status === 200) {
        setResponseMessage(
          "Success: The operation was completed successfully."
        );
      }
    } catch (error) {
      if (error.response.status === 401) {
        setResponseMessage("Error: Logged in user is not a superAdmin.");
      } else if (error.response.status === 400) {
        setResponseMessage(
          "Error: The email submitted is not registered as a KejaSpace user."
        );
      } else {
        setResponseMessage(`Unexpected error: ${error.response.status}`);
      }
    }
  };

  const dummyImage = "/images/download.png";

  if (loading) {
    return <div className="main-wrapper">Loading...</div>;
  }

  return (
    <>
      <div className="main-wrapper">
        <h2>PROFILE</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="m-3">
          <h3 className="m-10">Advertise with us</h3>
          <p>
            If you are a home owner and you would like to advertise your
            properties with us,
            <br />
            Fill in the requisition form.
          </p>
        </div>

        <div className="links">
          {userDetails.privilage === "agent" ||
          userDetails.privilage === "admin" ||
          userDetails.privilage === "manager" ? (
            <div className="d-flex gap-3">
              <Link to={"/addproperty"} className="btn btn-primary">
                Add Property
              </Link>
              <Link to={"/requisitions"} className="btn btn-primary">
                Requisition Forms
              </Link>
            </div>
          ) : (
            <Link to={"/UploadRequisitionForm"} className="btn btn-primary ">
              Requisition form
            </Link>
          )}
        </div>

        {/* <div className="user-info">
          <div className="property-image">
            <img
              src={propertyDetails[0]?.profilePic || dummyImage}
              alt="none"
            />
          </div>
          <div className="user-details">
            <h5>Name: {userDetails.firstName}</h5>
            <h5>Email: {userDetails.email}</h5>
          </div>
        </div> */}

        <div className="property-main-card">
          {propertyDetails.map((property) => (
            <div className="property-inner-card" key={property.propertyId}>
              <img
                src={property.profilePic}
                className="property-inner-image"
                alt={property.propertyTitle}
              />
              <p>{property.propertyTitle}</p>
              <p>{property.propertyDetails}</p>
              <div className="buttons d-flex justify-content-center gap-4">
                <Link
                  to={`/viewproperty/${property.propertyId}`}
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

        {userDetails.privilage === "admin" ||
          (userDetails.privilage === "agent" && (
            <div className="grant-rights-section">
              <h2 className="mt-3">
                <u>Grant Rights to Users</u>
              </h2>
              <form onSubmit={handleGrantRights}>
                <label className="m-3">
                  User ID:
                  <input
                    className="m-1"
                    type="text"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                  />
                </label>
                <br />
                <label className="m-3">
                  Email:
                  <input
                    className="m-1"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </label>
                <br />
                <label className="mb-2">
                  Role:
                  <select
                    className="m-1 p-2"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                  >
                    <option value="propertyManager">Property Manager</option>
                    <option value="agent">Agent</option>
                  </select>
                </label>
                <br />
                <button type="submit">Grant Rights</button>
              </form>
              {responseMessage && <p>{responseMessage}</p>}
            </div>
          ))}
      </div>
    </>
  );
};

export default Profile;
