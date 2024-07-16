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

  const [rightsModal, setRightsModal] = useState(false);

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

  const closeModal = () => {
    console.log("close clicked");
    setRightsModal(false);
  };

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
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setRightsModal(true)}
                data-bs-toggle="modal"
                data-bs-target="rightsModal"
              >
                Grant rights
              </button>
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

        {userDetails.privilage === "admin" && (
          // || userDetails.privilage === "agent"
          <div className="grant-rights-section">
            <h2 className="mt-3">Grant Rights to Users</h2>
            <form onSubmit={handleGrantRights}>
              <label htmlFor="userID" className="form-label">
                User ID:
                <input
                  className="form-control"
                  type="text"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                />
              </label>
              <br />
              <label htmlFor="email" className="form-label">
                Email:
                <input
                  className="form-control"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </label>
              <br />
              <label htmlFor="role" className="form-label">
                Role:
                <select
                  className="m-1 p-2 form-control"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="propertyManager">Property Manager</option>
                  <option value="agent">Agent</option>
                </select>
              </label>
              <br />
              <button type="submit" className="btn btn-success">
                Grant Rights
              </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        )}

        {/* <div className="user-info">
          <div className="property-image">
            <img
              src={propertyDetails[0]?.profilePic || dummyImage}
              alt="none"
            />
          </div>
          <div className="user-details">
            <h5>Name: {userDetails.firstName.charAt(0).toUpperCase() + userDetails.firstName.slice(1).toLowerCase()} {userDetails.lastName.charAt(0).toUpperCase() + userDetails.lastName.slice(1).toLowerCase()}</h5>
            <h5>Email: {userDetails.email}</h5>
            <h5>Role: {userDetails.privilage}</h5>
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
      </div>

      {rightsModal && (
        <div
          className="modal fade show grant-rights-modal"
          id="rightsModal"
          // data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="rightsModalLabel"
          aria-hidden="true"
          onClick={(e) => {
            if (e.target.id === "rightsModal") {
              closeModal();
            }
          }}
        >
          <div className="modal-dialog model-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-align-center">
                <h3 className="modal-title">Grant Rights</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleGrantRights}>
                  <label htmlFor="userID" className="form-label">
                    User ID:
                    <input
                      className="form-control"
                      type="text"
                      value={newUserId}
                      onChange={(e) => setNewUserId(e.target.value)}
                    />
                  </label>
                  <br />
                  <label htmlFor="email" className="form-label">
                    Email:
                    <input
                      className="form-control"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </label>
                  <br />
                  <label htmlFor="role" className="form-label">
                    Role:
                    <select
                      className="m-1 p-2 form-control"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                    >
                      <option value="propertyManager">Property Manager</option>
                      <option value="agent">Agent</option>
                    </select>
                  </label>
                  <br />
                  <button type="submit" className="btn btn-success">
                    Grant Rights
                  </button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
