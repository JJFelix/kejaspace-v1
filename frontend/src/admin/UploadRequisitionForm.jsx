// src/admin/UploadRequisitionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/RegisterForm.css';
import GoogleMapComponent from '../components/GoogleMap';
const UploadRequisitionForm = () => {
  
  const [error, setError] = useState(null); // Define error state
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null)
  const [formData, setFormData] = useState(
    {
      propertyTitle: '',
    phoneNumber: '',
    mainlocation: '',
    subLocation: '',
    propertyType: null,
    propertyPhotos: []
    }
  )

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e) => {
    const {name, files} = e.target;
    setFormData((prevData)=> ({
      ...prevData,
      [name]: name === 'propertyPhotos' ? [...files] : files[0]
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    const token = localStorage.getItem('sessionToken'); // Retrieve token from local storage

    if (!userId || !token) {
      setError('User is not authenticated. Please log in.');
      return;
    }
    data.append('userId', '');
    data.append('mainlocation', formData.mainlocation);
    data.append('propertyType', formData.propertyType);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('subLocation', formData.subLocation);
    data.append('propertyTitle', formData.propertyTitle);

    for (let i = 0; i < formData.propertyPhotos.length; i++) {
      const file = formData.propertyPhotos[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        data.append('propertyPhotos', JSON.stringify({
          picName: file.name,
          picContent: reader.result.split(',')[1]
        }));
      };
    }

    

    fetch('https://backend.kejaspace.com/requisitionForm', {
      method: 'POST',
      body: data,
      headers: {
        'authorization': token
      }
    })
      .then(response => response.json())
      .then(data => {
        setSuccess('Form submitted successfully');
        console.log('Form submitted successfully', data);
       setTimeout(() => navigate('/profile'), 2000);
      })
      .catch(error => {
        console.error('Error submitting form', error);
        setError('Failed to submit the form. Please try again.');
      });
  };


  return (
    <div className='main-wrapper'>
      <h2 className='m-3'>Upload Requisition Form</h2>
      <form onSubmit={handleSubmit} className='upload-form m-4'>
        <h4>Fill this form to contact the admin</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="mb-3">
          <label htmlFor="propertyTitle" className="form-label">Property Name</label>
          <input name="propertyTitle" type='text' className="form-control" id="propertyTitle" required />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Contact</label>
          <input name="phoneNumber" type='text' className="form-control" id="phoneNumber" required />
        </div>
        <div className="mb-3">
          <label htmlFor="mainlocation" className="form-label">Main Location</label>
          <input name="mainlocation" type='text' className="form-control" id="mainlocation" required />
        </div>
        <GoogleMapComponent />
        <div className="mb-3">
          <label htmlFor="houseName" className="form-label">Sub Location</label>
          <input name="houseName" type='text' className="form-control" id="houseName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="propertyType" className="form-label">Property Type</label>
          <input name='propertyType' type="text" className="form-control" id="propertyType" required />
        </div>
        <div className="mb-3">
          <label htmlFor="propertyPhotos" className="form-label">property images</label>
          <input name='propertyPhotos' type="file" className="form-control" id="propertyPhotos" multiple required />
        </div>
    
        <div className='d-flex m-3'>
          <button type="submit" className="button btn btn-primary">Submit</button>
          <button type="button" className="button btn btn-secondary" onClick={() => navigate('/profile')}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default UploadRequisitionForm;
