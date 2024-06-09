import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Property.css';

const Property = () => {
  const [images, setImages] = useState([]);

  const { propertyId } = useParams();
  console.log('property id:', propertyId);
  const [houses, setHouses] = useState([]);
  const [propertyName, setPropertyName] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [propertyLocation, setPropertyLocation] = useState('');
  const userId = localStorage.getItem('userId');



  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("sessionToken");

    axios
      .post(
        'https://backend.kejaspace.com/addProperty',
        {
          name: propertyName,
          location: propertyLocation,
        },
        {
          headers: {
            'authorization': token
          }
        }
      )
      .then(response => {
        // Store the property ID in local storage
        localStorage.setItem('propertyId', response.data.propertyId);
      })
      .catch(error => {
        console.error(error);
      });
  };



  useEffect(() => {
    // localStorage.removeItem("propertyId");
    // localStorage.removeItem("selectedHouse");
    const token = localStorage.getItem("sessionToken");
    axios
      .get(`https://backend.kejaspace.com/profile/${userId}/${propertyId}`, {
        headers: {
          'authorization': token
        }
      })
      .then(response => {
        console.log(response.data);
        setHouses(Array.isArray(response.data) ? response.data : []);
        console.log('houses:', houses);
        setSuccess("");
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error(error.response.data.error);
          setError(error.response.data.error);
        } else {
          console.error(error);
          setError('An error occurred');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propertyId, userId]);

  
  {/*console.log("userId: ", userId);
  console.log("houses: ", houses);*/
}
  const handleClickUpdate = (house) => {
    localStorage.setItem('propertyId', propertyId);
    localStorage.setItem('selectedHouse', JSON.stringify(house));

    navigate(`/viewproperty/${propertyId}`);

  };





  return (
    <div className='main-wrapper'>
      <h2>Units</h2>
      {error &&
        <div className="alert alert-danger register-form">
          <p className='danger'>{error}</p>
        </div>
      }
      {success &&
        <div className="alert alert-success register-form">
          <p>{success}</p>
        </div>
      }

      {userId && loading && <p>Loading...</p>}

      {userId &&
        <span className='m-3 d-flex justify-content-center gap-5 bt'>
          <Link to={`/addhouse/${propertyId}`} className='btn btn-primary'>
            <span className='text-decoration-none'>
              <small>Add Unit</small>
            </span>
          </Link>
          <Link to={`/profile`} className='btn btn-success'>
            <span className='text-decoration-none'>
              <small>Back to Profile</small>
            </span>
          </Link>
        </span>
      }

      <div className='house-card'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(houses) && houses.length > 0 ? (
            houses.map((house, index) => (
              <div key={index} className='house'>
                <h3>{house.propertyTitle}</h3>

                <h3>{house.houseCategory}</h3>
                <div className='img-container'>
                  {house.images.map((image, imgIndex) => (
                    <img key={imgIndex} className='house-image' src={image} alt={`House ${propertyId} Image ${imgIndex}`} />
                  ))}
                  {images.map((image, index) => (
                    <img key={index} src={image} alt={`Property ${propertyId} - Image ${index + 1}`} />
                  ))}
                </div>
                {/*<form onSubmit={handleSubmit}>
                  <label>
                    Property Category<br/> <h5> {house.houseCategory}</h5>
                  </label>
                  <label>
                    Property Location:
                    <input type="text" value={propertyLocation} onChange={e => setPropertyLocation(e.target.value)} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>*/}
                <div>
                
                 
                  
                <p className='border'> <h5>Unit Description: </h5>
               <h6 className='border-top'>House description</h6>{house.description}
                <h6 >House Category</h6>{house.houseCategory}
               <p><h6>Price: </h6>Ksh. {house.price}</p>
               <p><h6>Number of vacant units: </h6>{house.availableUnits}</p>
               <p className='m-3'><b><h6>Size of unit</h6></b> {house.sizeOfUnit}</p>
                </p>
                </div>
                <div>
                  <h5>Amenities:</h5>
                  <ul style={{ listStyleType: "none" }}>
                  {house.amenities && Object.entries(house.amenities).map(([key, value]) => (
                    value ? <li key={key}>{key}: {value}</li> :null
                      
                    ))}
                  </ul>
                </div>
                <div className='d-flex justify-content-center gap-2'>
                  <Link to={`/profile/updateadvert/${house.houseId}`} onClick={() => handleClickUpdate(house)} className='btn btn-primary'>
                    <span className='text-decoration-none'>
                      <small>Update </small><i className="fa-regular fa-pen-to-square"></i>
                    </span>
                  </Link>
                  <Link to={`/profile/deletehouse/${house.houseId}`} onClick={() => handleClickUpdate(house)} className='btn btn-danger'>
                    <span className='text-decoration-none'>
                      <small>Delete </small><i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No houses available</p>
          )
        )}
      </div><br />
      <button onClick={() => navigate('/profile')} className='btn btn-secondary mx-auto'>Back</button>
    </div>
  );
}

export default Property;
