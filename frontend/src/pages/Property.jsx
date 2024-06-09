import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './Property.css'
import { Link } from 'react-router-dom'

const Property = (props) => {
    const { propertyId } = useParams()
    console.log('property id:', propertyId)
    const [houses, setHouses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        localStorage.removeItem("propertyId")
        localStorage.removeItem("selectedHouse")
        const token = localStorage.getItem("sessionToken")
        axios
            .get(
                `https://backend.kejaspace.com/profile/appartment/${propertyId}`, {
                    headers:{
                        'authorization': token
                    }
                }
            )
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

    const userId = localStorage.getItem('userId')
    console.log("userId: ", userId)

    console.log("houses: ", houses)

    const handleClickUpdate = (house) =>{
        // e.preventDefault()
        localStorage.setItem('propertyId', propertyId)
        localStorage.setItem('selectedHouse', JSON.stringify(house))
    }
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

        {userId && houses == 0 && <p>Loading...</p>}

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
            {houses ==! 0 && loading ? (
                <p>Loading...</p>
            ) : (
                houses.map((house, index)=>(
                    <div key={index} className='house'>
                        <h3>{house.houseCategory}</h3>
                        <div className='img-container'>
                            {house.images.map((image, imgIndex)=>(
                                <img key={imgIndex} className='house-image' src={image} alt={`House ${propertyId} Image ${imgIndex}`} />
                            ))}
                        </div>
                        <p>{house.description}</p>
                        <p>Price: Ksh.{house.price}</p>
                        <p>Amenities: {house.amenities}</p>    
                        <div className='d-flex justify-content-center gap-2'>
                            <Link to={`/profile/updateadvert/${house.houseId}`} onClick={ (e) => handleClickUpdate(house)} className='btn btn-primary'>
                                <span className='text-decoration-none'>
                                    <small>Update </small><i className="fa-regular fa-pen-to-square"></i>
                                </span>
                            </Link>
                            <Link to={`/profile/deletehouse/${house.houseId}`} onClick={handleClickUpdate} className='btn btn-danger'>
                                <span className='text-decoration-none'>
                                    <small>Delete </small><i className="fa fa-trash" aria-hidden="true"></i>
                                </span>
                            </Link>   
                        </div>               
                    </div>                                   
                ))
            )}
            
        </div>    <br />
        
    </div>
  )
}

export default Property