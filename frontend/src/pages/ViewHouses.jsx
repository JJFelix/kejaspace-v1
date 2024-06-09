import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Property.css'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import call from '/images/call.png'

const ViewHouses = (property) => {
  const { images, location,  isVacant, contact,  } = property

  const { propertyId } = useParams()
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  }
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    axios
      .get(`https://backend.kejaspace.com/${propertyId}`)
      .then(response => {
       {/* console.log(response.data)*/}
        setHouses(response.data)
       {/* console.log('houses:', houses)*/}
        setSuccess("")
      })
      .catch(error => {
        console.error(error.response.data.error)
        setError(error.response.data.error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [propertyId])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    .then(() => {
      alert('Contact copied to clipboard!');

    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    })
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  }

  return (
    <div className='main-wrapper'>
      <div>
        <h3>View Units</h3>
      </div>

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

<div className='house-card'>
  {houses == !0 && loading ? (
    <p>Loading...</p>
  ) : (
    houses.map((house, index) => (
      <div key={index} className='house'>
        <div className='m-3 border-bottom'>
          <h5><b>House Category:</b></h5>
          <p>{house.houseCategory}</p>
        </div>

        <div className='img-container'>
          {house.housePics.map((image, imgIndex) => (
            <img 
              key={imgIndex} 
              className='house-image' 
              src={image} 
              alt={`House ${propertyId} Image ${imgIndex}`} 
              onClick={() => handleImageClick(image)} 
            />
          ))}
        </div>
        <h5><b>Unit Descriptions:</b></h5>
        <div className='m-2 border-bottom'>
          <h5><b> Description:</b></h5>
          <p>{house.description}</p>
        </div>

        <div className='d-flex justify-content-center border'>
          <div className='m-3'>
            <h6><b>Price:</b></h6>
            <p>Ksh. <i className="fa-solid fa-hand-holding-dollar"></i> {house.price}</p>
          </div>
          <div className='m-3'>
            <h6><b>Size of unit:</b></h6>
            <p>{house.sizeOfUnit}</p>
          </div>
          <div className='m-3'>
            <h6><b>Number of vacant units:</b></h6>
            <p>{house.availableUnits}</p>
          </div>
          <div className='m-3'>
            <h6><b>Unit Level:</b></h6>
            <p>{house.unitLevel} floor</p>
          </div>
        </div>

        {house.amenities && Object.keys(house.amenities).length > 0 && (
        <div className='m-3 border-bottom'>
          
          <h5>Amenities Present:</h5>
          <ul style={{ listStyleType: "none" }}>
            
              {Object.entries(
                typeof house.amenities === 'string'
                  ? JSON.parse(house.amenities)
                  : house.amenities
              )
              .filter(([key, value]) => value && value !== 'no' && value !== 'Not provided')
              .map(([key, value]) => (
                <li key={key}>
                  <strong>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </strong>{' '}
                  {typeof value === 'object' ? (
                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <span key={nestedKey}>
                        {nestedKey.charAt(0).toUpperCase() +
                          nestedKey.slice(1)}{' '}
                        : {nestedValue}{' '}
                      </span>
                    ))
                  ) : (
                    value 
                  )}
                </li>
              ))}
            
          </ul>
        </div>
    )}
        <div>
          <div className=' align-items-center'>
            <h5 className='mx-auto'>Call</h5>
            <img className='mx-auto justify-content-center' src={call} alt="Call Icon" 
            onClick={() => handleCall(house.contact)}/>
          </div>
          <h5 className='' onClick={() => copyToClipboard(house.contact)}>
            Contact: {house.contact}</h5>
        </div>

             

              {/*{userId == house.ownerId &&                        
                (<div className='d-flex justify-content-center gap-2'>
                  <Link to={`/profile/updateadvert/${house.houseId}`} onClick={handleClickUpdate} className='btn btn-primary'>
                    <span className='text-decoration-none'>
                        <small>Update </small><i className="fa-regular fa-pen-to-square"></i>
                    </span>
                  </Link>
                  <Link to={`/profile/deletehouse/${house.houseId}`} onClick={handleClickUpdate} className='btn btn-danger'>
                    <span className='text-decoration-none'>
                        <small>Delete </small><i className="fa fa-trash" aria-hidden="true"></i>
                    </span>
                  </Link>   
                </div>)
              }                   */}
            </div>
          ))
        )}
      </div>
      <button type="button" className="button mb-2 btn btn-secondary mx-auto " onClick={handleBackClick}>Back</button>

      {isModalOpen && (
        <div className='modal' onClick={closeModal}>
          <div className=''>
            <span className='close' onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt='Zoomed House' className='modal-image' />
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewHouses