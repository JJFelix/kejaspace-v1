// src/admin/RequisitionDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequisitionDetails = () => {
  const { id } = useParams();
  const [requisition, setRequisition] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    axios
      .get(`https://backend.kejaspace.com/requisitions/${id}`, {
        headers: {
          'authorization': token
        }
      })
      .then(response => {
        setRequisition(response.data);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching requisition details');
      });
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!requisition) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-wrapper'>
      <h1>Requisition Details</h1>
      <div className="requisition-details">
        <h3>{requisition.propertyTitle}</h3>
        <p><strong>Contact:</strong> {requisition.phoneNumber}</p>
        <p><strong>Main Location:</strong> {requisition.mainlocation}</p>
        <p><strong>Sub Location:</strong> {requisition.subLocation}</p>
        <p><strong>Property Type:</strong> {requisition.propertyType}</p>
        {requisition.propertyPhotos && requisition.propertyPhotos.map((photo, index) => (
          <div key={index}>
            <h4>{photo.picName}</h4>
            <img src={`data:image/jpeg;base64,${photo.picContent}`} alt={photo.picName} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/requisitions')} className='btn btn-secondary mx-auto'>Back</button>
    </div>
  );
};

export default RequisitionDetails;
