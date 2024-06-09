import { useState, useEffect } from "react";
import "./FeaturedProperties.scss";
import axios from "axios";
import PropertyCard from "./PropertyCard.jsx";

import { url1, url2 } from "../App.jsx";

import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage1 from "/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg";
import ExampleCarouselImage2 from "/images/1_516b72b60bbb43428a3330cc03c287ff.jpg";
import ExampleCarouselImage3 from "/images/todd-kent-178j8tJrNlc-unsplash_9fbc85da894043419dba3025c9818daf.jpg";
import ExampleCarouselImage4 from "/images/ralph-ravi-kayden-2d4lAQAlbDA-unsplash_f685097ac49a426c8c1caa685b54c95c.jpg";
import ExampleCarouselImage5 from "/images/etienne-beauregard-riverin-B0aCvAVSX8E-unsplash_d2ab9b9f78c542259668c00afb8b29fa.jpg";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();

  const [houseData, setHouseData] = useState({
    houseType: "",
    houseCategory: "",
    min_price: 0,
    max_price: 100000,
    location: "",
  });

  const [searchedProperties, setSearchedProperties] = useState([]);
  const [searchedProperties2, setSearchedProperties2] = useState([]);

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
        console.log("properties", properties);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setSearchedProperties(properties);
    console.log("searchedProperties 2", searchedProperties);
  }, [properties]);

  const dummyImage =
    "/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("properties 1", properties);
    console.log("houseData", houseData);
    function meetsCriteria(property, houseData) {
      if (
        (!houseData.houseType || property.houseType == houseData.houseType) &&
        (!houseData.houseCategory ||
          property.houseCategory == houseData.houseCategory) &&
        (!houseData.location ||
          property.location.charAt(0).toUpperCase() +
            property.location.slice(1).toLowerCase() ==
            houseData.location.charAt(0).toUpperCase() +
              houseData.location.slice(1).toLowerCase()) &&
        property.price >= houseData.min_price &&
        property.price <= houseData.max_price
      ) {
        return true;
      } else {
        return false;
      }
    }
    // const filtered = []

    if (
      houseData.houseType ||
      houseData.houseCategory ||
      houseData.location ||
      houseData.min_price ||
      houseData.max_price
    ) {
      const filtered = searchedProperties.filter((property) =>
        meetsCriteria(property, houseData)
      );
      console.log("filtered", filtered);
      setSearchedProperties2(filtered);
      console.log("searchedProperties after search: ", searchedProperties2);
    } else {
      // No search criteria provided, reset to original data
      setSearchedProperties(properties);
      console.log(
        "searchedProperties after search, no criteria",
        searchedProperties
      );
    }

    // const filtered = properties.filter( property => meetsCriteria(property, houseData))
    // console.log('filtered', filtered)
    // setSearchedProperties(filtered)
    // console.log('searchedProperties after search: ', searchedProperties)
    // console.log('searchedProperties 2', searchedProperties)
  };

  const houseCategoryOptions = {
    commercial: [
      "office spaces",
      "godowns and warehouses",
      "showrooms",
      "shops and rental spaces",
      "hotels and restaurants",
      "rental halls",
    ],
    residential: [
      "studio apartments",
      "bedsitter",
      "one bedroom",
      "two bedroom",
      "three bedroom",
      "bungalow and mansion",
    ],
  };

  const categoryOptions = houseCategoryOptions[houseData.houseType] || [];

  return (
    <>
      <div className="main-card">
        <div className="carousel d-flex">
          <div className="search-bar">
            <form
              className="d-flex align-items-center gap-3"
              onSubmit={handleSubmit}
            >
              {/* <label htmlFor="houseType">Type: </label> */}
              <select
                name="houseType"
                id="houseType"
                className="form-control"
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
                className="form-control"
                value={houseData.houseCategory}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value=""> </option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label htmlFor="min_price">Min Price:</label>
              <input
                type="number"
                name="min_price"
                className="form-control"
                id="min_price"
                value={houseData.min_price}
                onChange={handleChange}
                placeholder="Min Price"
              />
              <label htmlFor="max_price">Max Price: </label>
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
                name="location"
                className="form-control"
                value={houseData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="houseWrapper">
          <h1>Popular real estate units</h1>
          <div className="houses">
            {/* {searchedProperties.length === 0 && properties.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    properties.map((property, index)=>(
                        <PropertyCard key={index} property={property} onClick={() => handlePropertyClick(property)}/>
                    ))
                )} */}
            {searchedProperties2.length > 0 &&
              searchedProperties2.map((property, index) => (
                // <div key={index}>
                //     <p>{property.location}</p>
                // </div>
                <PropertyCard
                  key={index}
                  property={property}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
            {searchedProperties2.length === 0 &&
              searchedProperties.length > 0 &&
              searchedProperties.map((property, index) => (
                <PropertyCard
                  key={index}
                  property={property}
                  onClick={() => handlePropertyClick(property)}
                />
              ))}
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
                    <p>{selectedProperty.description}</p>
                    <p>
                      Price <i className="fa-solid fa-hand-holding-dollar"></i>{" "}
                      : Ksh. {selectedProperty.price}
                    </p>
                    <p>
                      Amenities <i className="fa-solid fa-table-list"></i> :
                      {selectedProperty.amenities}
                      {/* {
                                    selectedProperty.amenities.map((amenity, index)=>(
                                        <p key={index}>{amenity}</p>
                                    ))} */}
                    </p>
                    <p>
                      Contact <i className="fa-solid fa-phone"></i>: 0
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
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
