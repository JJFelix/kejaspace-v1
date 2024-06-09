import React from 'react'
import './FeaturedProperties.css'

import { Link } from 'react-router-dom'

const PropertyCard = ({ property, onClick }) => {
    const { images, location } = property
    const image1 = images[0]
    const image2 = images[1]
    const dummyImage = 'https://picsum.photos/250/150'
    const dummyImage2 = '/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg'
    const sentenceCase = property.houseCategory.charAt(0).toUpperCase() + property.houseCategory.slice(1).toLowerCase();
    // const  = property.houseCategory.charAt(0).toUpperCase() + property.houseCategory.slice(1).toLowerCase();
    // console.log(property)
    const amenities = property.amenities

  return (
    <div className='inner-card'>
      <div className='propert-image'>
        <img src={image1} alt={property.propertyTitle} />
      </div>
      <p>
        <i className="fa-solid fa-location-dot"></i> {property.propertyTitle} - {property.location}
      </p>
      <h3>{ sentenceCase }</h3>
      <p className='price'>
        <i className="fa-solid fa-hand-holding-dollar"></i> Ksh.{ property.price }
      </p>
      {/* <p className='btn vacant btn-warning text-center m-auto mb-2'>
        Vacant
      </p> */}
      {/* <p> <strong>Call/Text 0712345678</strong></p>   */}
      <div className='d-flex justify-content-center gap-3'>
        
        <Link 
          to={`/viewhouses/${property.propertyId}`} 
          className='btn btn-secondary'
        >
          More info
        </Link>    
        <Link 
          to={`/viewhouses/${property}`} 
          className='btn btn-secondary'
        >
          Other units
        </Link>         
      </div>
      {/* <hr /> */}
    </div>
  )
}

export default PropertyCard