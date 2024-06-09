// src/admin/RequisitionList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    axios
      .get('https://backend.kejaspace.com/requisitions', {
        headers: {
          'authorization': token
        }
      })
      .then(response => {
        setRequisitions(response.data);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching requisitions');
      });
  }, []);

  return (
    <div className='main-wrapper'>
      <h1>Requisition Forms</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="requisition-list">
        {requisitions.map(requisition => (
          <div key={requisition.id} className="requisition-item">
            <h3>{requisition.propertyTitle}</h3>
            <p>{requisition.phoneNumber}</p>
            <Link to={`/requisition/${requisition.id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/profile')} className='btn btn-secondary mx-auto'>Back</button>
    </div>
  );
};

export default RequisitionList;
