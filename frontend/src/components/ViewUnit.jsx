import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewUnit = () => {
  const { unitId } = useParams();
  const [unitDetails, setUnitDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage
    const propertyId = unitId; // Assuming unitId is the propertyId
    axios
      .get(`https://backend.kejaspace.com/profile/${userId}/${propertyId}`, {
        headers: {
          'Authorization': `token`,
        },
      })
      .then((response) => {
        setUnitDetails(response.data[0]); // Assuming the response is an array and you want the first item
      })
      .catch((error) => {
        console.error('Error fetching unit details:', error);
        setError('Failed to fetch unit details. Please try again.');
      });
  }, [unitId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!unitDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Unit Details</h1>
      <p>House Type: {unitDetails.houseType}</p>
      <p>House Category: {unitDetails.houseCategory}</p>
      <p>Price: {unitDetails.price}</p>
      <p>Description: {unitDetails.description}</p>
      <p>Floor: {unitDetails.floor}</p>
      <p>Room Number: {unitDetails.roomNumber}</p>
      <h2>Images</h2>
      <div>
        {unitDetails.images.map((image, index) => (
          <img key={index} src={`https://backend.kejaspace.com/images/${image}`} alt={`House Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ViewUnit;
