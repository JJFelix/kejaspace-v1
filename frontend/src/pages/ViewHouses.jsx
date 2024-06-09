import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Property.css'

const ViewHouses = () => {
  const {propertyId} = useParams()
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(()=>{
    axios
      .get(`https://backend.kejaspace.com/${propertyId}`)
      .then(response =>{
          console.log(response.data)
          setHouses(response.data)
          console.log('houses:', houses)
          setSuccess("")
      })
      .catch(error =>{
          console.error(error.response.data.error)
          setError(error.response.data.error)
      })
      .finally(()=>{
          setLoading(false)
      })
  },[propertyId])

  return (
    <div className='main-wrapper'>
      <div>
        <h3>Units</h3>
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
        {houses ==! 0 && loading ? (
            <p>Loading...</p>
        ) : (
          houses.map((house, index)=>(
            <div key={index} className='house'>
              <h3>{house.houseCategory}</h3>
              <div className='img-container'>
                {house.housePics.map((image, imgIndex)=>(
                  <img key={imgIndex} className='house-image' src={image} alt={`House ${propertyId} Image ${imgIndex}`} />
                ))}
              </div>
              <p>{house.description}</p>
              <p><i className="fa-solid fa-hand-holding-dollar"></i> Ksh.{house.price}</p>
              <p><b>Amenities</b>: {house.amenities}</p>    
              {/* {userId == house.ownerId &&                        
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
              }                       */}
            </div>                                   
          ))
        )}          
      </div>
      </div>
  )
}

export default ViewHouses