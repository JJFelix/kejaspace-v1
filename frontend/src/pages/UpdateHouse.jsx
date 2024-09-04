import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateHouse = () => {
  const propertyId = localStorage.getItem("propertyId");
  const { houseId } = useParams();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const selectedHouse = JSON.parse(localStorage.getItem("selectedHouse"));

  const [houseData, setHouseData] = useState({
    houseType: selectedHouse.houseType,
    houseCategory: selectedHouse.houseCategory,
    price: parseInt(selectedHouse.price),
    description: selectedHouse.description,
    availableUnits: selectedHouse.availableUnits,
    unitLevel: selectedHouse.unitLevel,
    sizeOfUnit: selectedHouse.sizeOfUnit,
    // images: [
    //   {
    //     picName: "",
    //     picContent: "base64",
    //   },
    // ],
    images: selectedHouse.images.map((imageUrl) => ({
      picName: imageUrl.split("/").pop(), // Extracts the file name from the URL
      picContent: imageUrl, // You may want to keep the URL as is or convert it to base64 later
    })),
    amenities: selectedHouse.amenities,
  });

  const navigate = useNavigate();

  // mapping of houseType to houseCategory
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

  const handleInputChange = async (e) => {
    const { name, files } = e.target;

    if (name === "images" && files && files.length > 0) {
      const selectedImages = [];

      for (const file of files) {
        try {
          const picContent = await readAsDataURL(file);

          if (picContent) {
            selectedImages.push({
              picName: file.name,
              picContent: picContent.split(",")[1], // Extracting the base64 content
            });
          }
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }

      setHouseData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...selectedImages],
      }));
    } else {
      setHouseData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };

  const readAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    });
  };
  const handleAmenityChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(houseData);

    const token = localStorage.getItem("sessionToken");
    axios
      .put(
        `https://backend.kejaspace.com/profile/updateUnit/${houseId}`,
        houseData,
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        setSuccess(response.data.success);
        setError(null);
        navigate(`/viewproperty/${propertyId}`);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data.error);
        } else {
          setError(
            "Network Error: Unable to reach the server. Please try again later."
          );
        }
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
    <div className="main-wrapper">
      <div>
        <h3>Update Unit</h3>
      </div>

      {error && (
        <div className="alert alert-danger register-form">
          <p className="danger">{error}</p>
        </div>
      )}
      {success && (
        <div className="alert alert-success register-form">
          <p>{success}</p>
        </div>
      )}

      <div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="houseType" className="form-label">
              Unit Type
            </label>
            : <br />
            <select
              name="houseType"
              id="houseType"
              value={houseData.houseType}
              onChange={handleInputChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value=""> </option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="houseCategory" className="form-label">
              House Category
            </label>
            <select
              name="houseCategory"
              id="houseCategory"
              value={houseData.houseCategory}
              onChange={handleInputChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              name="price"
              value={houseData.price}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              id="price"
              aria-describedby="price"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description of Unit
            </label>
            <textarea
              name="description"
              value={houseData.description}
              onChange={handleInputChange}
              className="form-control"
              id="description"
              aria-describedby="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="availableUnits" className="form-label">
              Number of available Units
            </label>
            <input
              name="availableUnits"
              value={houseData.availableUnits}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              id="price"
              aria-describedby="price"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="unitLevel" className="form-label">
              Level of the Unit
            </label>
            <select
              name="unitLevel"
              id="unitLevel"
              value={houseData.unitLevel}
              onChange={handleInputChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
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
            <label htmlFor="sizeOfUnit" className="form-label">
              Size of Unit (Sq Metres)
            </label>
            <input
              name="sizeOfUnit"
              value={houseData.sizeOfUnit}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="sizeOfUnit"
              aria-describedby="sizeOfUnit"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="balcony" className="form-label">
              Presence of a Balcony
            </label>
            <select
              name="balcony"
              id="balcony"
              value={houseData.amenities.balcony}
              onChange={handleAmenityChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="wardrobe" className="form-label">
              Availability of Wardrobes
            </label>
            <select
              name="wardrobe"
              id="wardrobe"
              value={houseData.amenities.wardrobe}
              onChange={handleAmenityChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="kitchenCabinets" className="form-label">
              Availability of Kitchen Cabinets
            </label>
            <select
              name="kitchenCabinets"
              id="kitchenCabinets"
              value={houseData.amenities.kitchenCabinets}
              onChange={handleAmenityChange}
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="p-2">
            <h5 className="mb-2">
              <u>Amenities Available</u>
            </h5>
            <div className="mb-3">
              <label htmlFor="water" className="form-label">
                Water (Price per Unit)
              </label>
              <input
                name="water"
                value={houseData.amenities.water}
                onChange={handleAmenityChange}
                type="number"
                className="form-control"
                id="water"
                aria-describedby="water"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="garbageCollection" className="form-label">
                Garbage Collection (Price per Month)
              </label>
              <input
                name="garbageCollection"
                value={houseData.amenities.garbageCollection}
                onChange={handleAmenityChange}
                type="number"
                className="form-control"
                id="garbageCollection"
                aria-describedby="garbageCollection"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfToilets" className="form-label">
                Number Of Toilets
              </label>
              <input
                name="numberOfToilets"
                value={houseData.amenities.numberOfToilets}
                onChange={handleAmenityChange}
                type="number"
                className="form-control"
                id="numberOfToilets"
                aria-describedby="numberOfToilets"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="electricity" className="form-label">
                Electricity
              </label>
              <select
                name="electricity"
                id="electricity"
                value={houseData.amenities.electricity}
                onChange={handleAmenityChange}
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option value=""></option>
                <option value="prepaid">Prepaid</option>
                <option value="postpaid">Postpaid</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cctv" className="form-label">
                CCTV
              </label>
              <select
                name="cctv"
                id="cctv"
                value={houseData.amenities.cctv}
                onChange={handleAmenityChange}
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="security" className="form-label">
                Security
              </label>
              <select
                name="security"
                id="security"
                value={houseData.amenities.security}
                onChange={handleAmenityChange}
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="numberofBathrooms" className="form-label">
                Number of Bathrooms
              </label>
              <input
                name="numberofBathrooms"
                value={houseData.amenities.numberofBathrooms}
                onChange={handleAmenityChange}
                type="number"
                className="form-control"
                id="numberofBathrooms"
                aria-describedby="numberofBathrooms"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberofBedrooms" className="form-label">
                Number of Bedrooms
              </label>
              <input
                name="numberofBedrooms"
                value={houseData.amenities.numberofBedrooms}
                onChange={handleAmenityChange}
                type="number"
                className="form-control"
                id="numberofBedrooms"
                aria-describedby="numberofBedrooms"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">
              House Images
            </label>
            <input
              name="images"
              onChange={handleInputChange}
              type="file"
              className="form-control"
              id="images"
              aria-describedby="images"
              multiple
              // value={houseData.images}
            />
          </div>
          <div className="d-flex">
            {houseData.images.map((image, index) => (
              <div key={index} >
                <img
                  src={image.picContent}
                  alt={`House Image ${index + 1}`}
                  className="img-thumbnail"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="d-flex m-2">
            <button type="submit" className="button btn btn-primary">
              UPDATE
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHouse;
