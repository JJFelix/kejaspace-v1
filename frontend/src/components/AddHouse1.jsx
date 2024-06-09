import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHouse = () => {
  const { propertyId } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [houseData, setHouseData] = useState({
    houseType: "",
    houseCategory: "",
    price: 0,
    description: "",
    images: [
      {
        picName: '', 
        picContent: "base64"
      }
    ],
    amenities: [],
    mainLocation: "",
    subLocation: "",
    distanceFromMainRoad: "",
    unitSize: "",
    unitLevel: "",
    balcony: "",
    wardrobes: "",
    kitchenCabinets: "",
    waterPrice: 0,
    garbagePrice: 0,
    electricityType: "",
    cctv: "",
    security: ""
  });

  const amenitiesOptions = ["Water", "Electricity", "Internet Connection", "Lighting", "City viewscape"];
  const navigate = useNavigate();

  // Mapping of houseType to houseCategory
  const houseCategoryOptions = {
    commercial: [
      'office spaces', 'godowns and warehouses', 'showrooms',
      'shops and rental spaces', 'hotels and restaurants',
      'rental halls'
    ],
    residential: [
      'studio apartments', 'bedsitter', 'one bedroom',
      'two bedroom', 'three bedroom', 'bungalow and mansion'
    ]
  };

  const categoryOptions = houseCategoryOptions[houseData.houseType] || [];

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'images' && files && files.length > 0) {
      const selectedImages = [];
      for (const file of files) {
        try {
          const picContent = await readAsDataURL(file);
          if (picContent) {
            selectedImages.push({
              picName: file.name,
              picContent: picContent.split(',')[1], // Extracting the base64 content
            });
          }
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
      setHouseData((prevData) => ({
        ...prevData,
        images: selectedImages,
      }));
    } else {
      setHouseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAmenityChange = (e) => {
    const amenity = e.target.value;
    setHouseData((prevData) => {
      if (e.target.checked) {
        return { ...prevData, amenities: [...prevData.amenities, amenity] };
      } else {
        return {
          ...prevData,
          amenities: prevData.amenities.filter((a) => a !== amenity),
        };
      }
    });
  };

  // Helper function to read file content as data URL
  const readAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(houseData);
    const token = localStorage.getItem('sessionToken');
    axios
      .post(`https://backend.kejaspace.com/profile/addhouse/${propertyId}`, houseData, {
        headers: {
          'authorization': token,
        },
      })
      .then((response) => {
        setSuccess('Unit added successfully');
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to add unit. Please try again');
      });
  };

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        navigate(`/viewproperty/${propertyId}`);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success, navigate]);

  return (
    <div className='main-wrapper'>
      <div>
        <h3>Add Unit</h3>
      </div>

      {error && 
        <div className="alert alert-danger register-form">
          <p className='danger'>{error}</p>
        </div>
      }
      {success &&
        <div className="alert alert-success register-form">
          <p>{success}. Redirecting shortly to property page</p>
        </div>
      }

      <div>
        <form className='register-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="houseType" className="form-label">Unit Type</label>: <br />
            <select name="houseType" id="houseType" value={houseData.houseType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""> </option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="houseCategory" className="form-label">Unit Category</label>
            <select name="houseCategory" id="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mainLocation" className="form-label">Main Location</label>
            <input name="mainLocation" value={houseData.mainLocation} onChange={handleInputChange} type='text' className="form-control" id="mainLocation" aria-describedby="mainLocation" />
          </div>
          <div className="mb-3">
            <label htmlFor="subLocation" className="form-label">Sub Location</label>
            <input name="subLocation" value={houseData.subLocation} onChange={handleInputChange} type='text' className="form-control" id="subLocation" aria-describedby="subLocation" />
          </div>
          <div className="mb-3">
            <label htmlFor="distanceFromMainRoad" className="form-label">Distance from Main Road</label>
            <input name="distanceFromMainRoad" value={houseData.distanceFromMainRoad} onChange={handleInputChange} type='text' className="form-control" id="distanceFromMainRoad" aria-describedby="distanceFromMainRoad" />
          </div>
          <div className="mb-3">
            <label htmlFor="unitSize" className="form-label">Size of the Unit</label>
            <input name="unitSize" value={houseData.unitSize} onChange={handleInputChange} type='text' className="form-control" id="unitSize" aria-describedby="unitSize" />
          </div>
          <div className="mb-3">
            <label htmlFor="unitLevel" className="form-label">Level of the Unit</label>
            <select name="unitLevel" id="unitLevel" value={houseData.unitLevel} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="ground">Ground</option>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
              {/* Add more levels if needed */}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="balcony" className="form-label">Presence of a Balcony</label>
            <select name="balcony" id="balcony" value={houseData.balcony} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="wardrobes" className="form-label">Availability of Wardrobes</label>
            <select name="wardrobes" id="wardrobes" value={houseData.wardrobes} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="kitchenCabinets" className="form-label">Availability of Kitchen Cabinets</label>
            <select name="kitchenCabinets" id="kitchenCabinets" value={houseData.kitchenCabinets} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="waterPrice" className="form-label">Water (Price per Unit)</label>
            <input name="waterPrice" value={houseData.waterPrice} onChange={handleInputChange} type='number' className="form-control" id="waterPrice" aria-describedby="waterPrice" />
          </div>
          <div className="mb-3">
            <label htmlFor="garbagePrice" className="form-label">Garbage Collection (Price per Month)</label>
            <input name="garbagePrice" value={houseData.garbagePrice} onChange={handleInputChange} type='number' className="form-control" id="garbagePrice" aria-describedby="garbagePrice" />
          </div>
          <div className="mb-3">
            <label htmlFor="electricityType" className="form-label">Electricity</label>
            <select name="electricityType" id="electricityType" value={houseData.electricityType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cctv" className="form-label">CCTV</label>
            <select name="cctv" id="cctv" value={houseData.cctv} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="security" className="form-label">Security</label>
            <select name="security" id="security" value={houseData.security} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description of the Uploaded Unit</label>
            <textarea name="description" value={houseData.description} onChange={handleInputChange} className="form-control" id="description" aria-describedby="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Upload Images</label>
            <input name='images' onChange={handleInputChange} type="file" className="form-control" id="images" multiple aria-describedby="images" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHouse;
