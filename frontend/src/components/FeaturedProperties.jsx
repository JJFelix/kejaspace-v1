import { useState, useEffect } from "react";
import "./FeaturedProperties.css";
import axios from "axios";
import PropertyCard from "./PropertyCard.jsx";
import { useNavigate } from "react-router-dom";

import { url1, url2 } from "../App.jsx";

import Carousel from "react-bootstrap/Carousel";

import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [categories, setCategories] = useState([]);

  const [houseData, setHouseData] = useState({
    houseType: "",
    houseCategory: "",
    min_price: 0,
    max_price: 100000,
    mainlocation: "",
  });

  const [searchedProperties, setSearchedProperties] = useState([]);
  const [searchedProperties2, setSearchedProperties2] = useState([]);

  const [listedProperties, setListedProperties] = useState([]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  useEffect(() => {
    axios
      .get(
        "https://backend.kejaspace.com/"
        // `${url2}`
      )
      .then((response) => {
        setProperties(response.data);
        {
          // console.log('properties', properties);
        }
        setSearchedProperties(response.data);
        extractCategories(response.data);

        const uniqueObjects = [];
        const seen = new Set();

        for (const obj of response.data) {
          const identifier = `${obj.propertyTitle}-${obj.propertyId}-${obj.profilePic}`;
          if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueObjects.push(obj);
          }
        }

        setListedProperties(uniqueObjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setSearchedProperties(properties);
    // console.log("searchedProperties 2", searchedProperties);
    // console.log("Listed properties: ", listedProperties);
  }, [properties]);

  const extractCategories = (properties) => {
    const categoriesSet = new Set();
    properties.forEach((property) => {
      if (property.houseCategory) {
        categoriesSet.add(property.houseCategory);
      }
    });
    setCategories(Array.from(categoriesSet));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBackClick = () => {
    setHouseData({
      houseType: "",
      houseCategory: "",
      min_price: 0,
      max_price: 100000,
      mainlocation: "",
    });
    setSearchedProperties(properties);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("properties 1", properties);
    console.log("houseData", houseData);

    const filteredProperties = properties.filter((property) => {
      const matchesType = !houseData.houseType || property.houseType === houseData.houseType;
      const matchesCategory = !houseData.houseCategory || property.houseCategory === houseData.houseCategory;
      const matchesLocation =  houseData.mainlocation || (
        property.mainlocation && property.mainlocation.toLowerCase() === houseData.mainlocation.toLowerCase());
      const matchesPrice = property.price >= houseData.min_price && property.price <= houseData.max_price;
      return matchesType && matchesCategory && matchesLocation && matchesPrice;
    });
    setSearchedProperties(filteredProperties);
    // [];

    {
      /*if (houseData.houseType || houseData.houseCategory || houseData.location || houseData.min_price || houseData.max_price) {
            const filtered = searchedProperties.filter(property => meetsCriteria(property, houseData))
            console.log('filtered', filtered)
            setSearchedProperties2(filtered)
            console.log('searchedProperties after search: ', searchedProperties2)
        } else {
            // No search criteria provided, reset to original data
            setSearchedProperties(properties)
            console.log('searchedProperties after search, no criteria', searchedProperties)
        }

        // const filtered = properties.filter( property => meetsCriteria(property, houseData))
        // console.log('filtered', filtered)
        // setSearchedProperties(filtered)
        // console.log('searchedProperties after search: ', searchedProperties)
    // console.log('searchedProperties 2', searchedProperties)*/
    }
  };

  {
    /*const houseCategoryOptions = {
        commercial: [
            'office', 'godowns and warehouses', 'showrooms',
            'shops and rental spaces', 'hotels and restaurants',
            'rental halls'
        ],
        residential: [
            'studio apartments', 'bedsitter', 'one bedroom',
            'two bedroom', 'three bedroom', 'bungalow and mansion'
        ]
    } */
  }

  const handlePropertyImageClick = (propertyId) => {
    const id = propertyId;
    // console.log(`Image ${id} clicked`);
    navigate(`/viewhouses/${id}`);
  };

  // console.log(properties);

  return (
    <>
      <div>
        <div className="listed-properties">
          {listedProperties.length > 0 && listedProperties.length > 0 ? (
            listedProperties.map((property, index) => (
              <div className="listed-property" key={index}>
                <strong>{property.propertyTitle}</strong>
                <img
                  src={"https://kejaspace.com/images/" + property.profilePic}
                  alt={property.propertyTitle}
                  onClick={() => handlePropertyImageClick(property.propertyId)}
                />
              </div>
            ))
          ) : (
            <div className="listed-property">Listed Property</div>
          )}
          
        </div>

        {/* <Carousel className="carousel2" fade>
          {properties.map((property, index) => (
            // property.images.length > 0
            // ? property.images.map((image, imgIndex) => (
            <Carousel.Item
              key={index}
              className="img-carousel"
            >
              <Link to={`/viewhouses/${property.propertyId}`}>
                <img
                  src={property.images[0]}
                  alt={property.propertyTitle}
                  style={{ cursor: "pointer", height: "80%" }}
                />
              </Link>
            </Carousel.Item>
            // )) : null
          ))}
        </Carousel> */}

        <h2 className="search-tag">SEARCH YOUR PREFERRED PROPERTIES</h2>
      </div>

      <div className="main-card">
        <div className="search-bar justify-content-center">
          <form className=" align-items-center   gap-3 searchform" onSubmit={handleSubmit}>
            {/* <label htmlFor="houseType">Type: </label> */}
            <select
              name="houseType"
              id="houseType"
              className="form-control m-1"
              value={houseData.houseType}
              onChange={handleChange}
              placeholder="House Type"
            >
              <option value="" disabled>
                Type
              </option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
            {/* <label htmlFor="houseCategory">Category: </label> */}
            <select
              name="houseCategory"
              id="houseCategory"
              className="form-control m-1"
              value={houseData.houseCategory}
              onChange={handleChange}
            >
              <option value="" disabled>
                Category
              </option>

              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="min_price" className="m-1">
              Min Price
            </label>
            <input
              type="number"
              name="min_price"
              className="form-control"
              id="min_price"
              value={houseData.min_price}
              onChange={handleChange}
              placeholder="Min Price"
            />
            <label htmlFor="max_price">Max Price</label>
            <input
              type="number"
              name="max_price"
              className="form-control"
              id="max_price"
              value={houseData.max_price}
              onChange={handleChange}
              placeholder="Max Price"
            />
            <input
              type="text"
              name="mainlocation"
              className="form-control m-1"
              value={houseData.mainlocation}
              onChange={handleChange}
              placeholder="Location"
            />
            <button type="submit" className="btn btn-success m-5">
              Search
            </button>
          </form>
        </div>

        <h1>FEATURED UNITS</h1>
        <div className="houses">
          {/* {searchedProperties.length === 0 && properties.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    properties.map((property, index)=>(
                        <PropertyCard key={index} property={property} onClick={() => handlePropertyClick(property)}/>
                    ))
                )} */}
          {searchedProperties.length > 0 ? (
            searchedProperties.map((property, index) => (
              <PropertyCard
                key={index}
                property={property}
                onClick={() => setSelectedProperty(property)}
              />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>

        {selectedProperty && (
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog model-dialog-centered">
              <div className="modal-content">
                <div className="modal-header text-align-center">
                  <h5
                    className="modal-title text-center"
                    id="staticBackdropLabel"
                  >
                    {selectedProperty.houseCategory} in{" "}
                    {selectedProperty.location}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p> {selectedProperty.description}</p>
                  <p>
                    {" "}
                    <i className="fa-solid fa-hand-holding-dollar"></i>{" "}
                    {selectedProperty.price}
                  </p>
                  <p>
                    <i className="fa-solid fa-table-list"></i> :
                    {selectedProperty.amenities}
                    {selectedProperty.amenities.map((amenity, index) => (
                      <p key={index}>{amenity}</p>
                    ))}
                  </p>
                  <p>{selectedProperty.description}</p>

                  <p>
                    Contact <i className="fa-solid fa-phone"></i>
                    {selectedProperty.contact}
                  </p>
                  <div className="modal-img-container">
                    {selectedProperty.images.map((image, index) => (
                      <div key={index}>
                        <img
                          className=""
                          src={image}
                          alt={selectedProperty.houseId}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary mb-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleBackClick}
          className="btn btn-secondary mx-auto m-3"
        >
          Home
        </button>
      </div>
    </>
  );
};

export default FeaturedProperties;

// {
//     const meetsCriteria =
//     ( property.houseType === houseData.houseType) &&
//     ( property.houseCategory === houseData.houseCategory) &&
//     ( property.location === houseData.location) &&
//     property.price >= houseData.min_price &&
//     property.price <= houseData.max_price

//     return meetsCriteria
// }
