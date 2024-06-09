import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewProperty = () => {
  const { userId, propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !propertyId) {
      setError('Invalid user or property ID.');
      
      return;
      
    }

    const token = localStorage.getItem('sessionToken');
    if (!token) {
      setError('No authorization token found. Please log in again.');
      return;
    }

    axios
      .get(`https://backend.kejaspace.com/profile/${userId}/${propertyId}`, {
        headers: {
          'authorization': token
        }
      })
      .then((response) => {
        setPropertyDetails(response.data[0]); // Assuming response.data is an array
        setError(null);
        console.log('Property details:', propertyDetails)
        console.log('User ID:', userId);
      })
      .catch((error) => {
        console.error('Error fetching property details:', error);
        if (error.response) {
          setError(`Error: ${error.response.data.error || error.response.statusText}`);
        } else if (error.request) {
          setError('No response received from server.');
        } else {
          setError('An unexpected error occurred.');
        }
      });
  }, [userId, propertyId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!propertyDetails) {
    return <p>Loading property details...</p>;
  }

  return (
    <div className='main-wrapper'>
      <h1>Property Details</h1>
      <div className='property-details'>
        <h2>House Category: {propertyDetails.houseCategory}</h2>
        <h2>Description</h2>
        <p>{propertyDetails.description}</p>
        <h2>House Type: {propertyDetails.houseType}</h2>
        <p>Floor: {propertyDetails.floor}</p>
        <p>Price: {propertyDetails.price}</p>
        <div className='property-images'>
          {propertyDetails.images && propertyDetails.images.length > 0 ? (
            propertyDetails.images.map((image, index) => (
              <img key={index} src={`https://backend.kejaspace.com/images/${image}`} alt={`Property image ${index}`} />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
        <button onClick={() => navigate(-1)} className='btn btn-secondary'>Back</button>
      </div>
    </div>
  );
};

export default ViewProperty;
