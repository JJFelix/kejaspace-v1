import { useState, useEffect } from 'react';
import './FeaturedProperties.css';
import axios from 'axios';
import PropertyCard from './PropertyCard.jsx';

import { url1, url2 } from '../App.jsx';
const dummyImage = '/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg';


import Carousel from 'react-bootstrap/Carousel';

const FeaturedProperties1 = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [houseData, setHouseData] = useState({
    houseType: "",
    houseCategory: "",
    min_price: 0,
    max_price: 100000,
    location: ""
  });

  const [searchedProperties, setSearchedProperties] = useState([]);
  const [searchedProperties2, setSearchedProperties2] = useState([]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  useEffect(() => {
    axios.get('https://backend.kejaspace.com/')
      .then(response => {
        setProperties(response.data);
        console.log('properties', properties);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setSearchedProperties(properties);
    console.log('searchedProperties 2', searchedProperties);
  }, [properties]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('properties 1', properties);
    console.log('houseData', houseData);

    function meetsCriteria(property, houseData) {
      return (
        ((!houseData.houseType || property.houseType === houseData.houseType) &&
          (!houseData.houseCategory || property.houseCategory === houseData.houseCategory) &&
          (!houseData.location || property.location.toLowerCase() === houseData.location.toLowerCase()) &&
          property.price >= houseData.min_price &&
          property.price <= houseData.max_price)
      );
    }

    if (houseData.houseType || houseData.houseCategory || houseData.location || houseData.min_price || houseData.max_price) {
      const filtered = searchedProperties.filter(property => meetsCriteria(property, houseData));
      console.log('filtered', filtered);
      setSearchedProperties2(filtered);
      console.log('searchedProperties after search: ', searchedProperties2);
    } else {
      setSearchedProperties(properties);
      console.log('searchedProperties after search, no criteria', searchedProperties);
    }
  };

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

  return (
    <>
    <h5>fp1</h5>
      <div className='main-card'>
        <div className='carousel d-flex'>
          <Carousel className='tag'>
            {properties.map((property, index) => (
              property.images.length > 0 ? (
                property.images.map((image, imgIndex) => (
                  <Carousel.Item key={`${index}-${imgIndex}`} className='img-carousel'>
                    <img src={image} alt="" />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item key={index} className='img-carousel'>
                  <img src={dummyImage} alt="" />
                </Carousel.Item>
              )
            ))}
          </Carousel>
          <div className='search-bar'>
            <form className='d-flex align-items-center gap-3' onSubmit={handleSubmit}>
              <select name="houseType" id="houseType" className="form-control" value={houseData.houseType} onChange={handleChange} placeholder='House Type'>
                <option value="" disabled >Type</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
              </select>
              <select name="houseCategory" id="houseCategory" className="form-control" value={houseData.houseCategory} onChange={handleChange}>
                <option value="" disabled >Category</option>
                <option value=""> </option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label htmlFor="min_price">Min Price:</label>
              <input type="number" name="min_price" className="form-control" id="min_price" value={houseData.min_price} onChange={handleChange} placeholder='Min Price' />
              <label htmlFor="max_price">Max Price: </label>
              <input type="number" name="max_price" className="form-control" id="max_price" value={houseData.max_price} onChange={handleChange} placeholder='Max Price' />
              <input type="text" name='location' className="form-control" value={houseData.location} onChange={handleChange} placeholder='Location' />
              <button type='submit' className='btn btn-primary' >Search</button>
            </form>
          </div>
        </div>

        <h1>Popular real estate units</h1>
        <div className="houses">
          {
            searchedProperties2.length > 0 ? (
              searchedProperties2.map((property, index) => (
                <PropertyCard key={index} property={property} onClick={() => handlePropertyClick(property)} />
              ))
            ) : (
              searchedProperties.map((property, index) => (
                <PropertyCard key={index} property={property} onClick={() => handlePropertyClick(property)} />
              ))
            )
          }
        </div>

        {selectedProperty && (
          <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog model-dialog-centered">
              <div className="modal-content">
                <div className="modal-header text-align-center">
                  <h5 className="modal-title text-center" id="staticBackdropLabel">{selectedProperty.houseCategory} in {selectedProperty.location}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>{selectedProperty.description}</p>
                  <p>Price <i className="fa-solid fa-hand-holding-dollar"></i>: Ksh. {selectedProperty.price}</p>
                  <p>Amenities <i className="fa-solid fa-table-list"></i>:
                    {selectedProperty.amenities.join(', ')}
                  </p>
                  <p>Contact <i className="fa-solid fa-phone"></i>: 0{selectedProperty.contact}</p>
                  <div className='modal-img-container'>
                    {selectedProperty.images.map((image, index) => (
                      <div key={index}>
                        <img className='' src={image} alt={selectedProperty.houseId} />
                      </div>
                    ))}
                  </div>
                  <p>Status: {selectedProperty.vacant ? 'Vacant' : 'Occupied'}</p>
                  {selectedProperty.vacant && <p>Number of vacant units available: {selectedProperty.vacantUnits}</p>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedProperties1;
