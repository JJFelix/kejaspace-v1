import React, { useState, useEffect } from 'react'
import './FeaturedProperties.css'


import { Link } from 'react-router-dom'

const PropertyCard = ({ property, onClick }) => {
  const [properties, setProperties] = useState([])
  const { images, location, propertyId, isVacant, contact, mainlocation, subLocation = "N/A", distanceFromMainRoad = "N/A" } = property;
  {/*console.log(property);*/ }
  const image1 = images[0]
  //const image2 = images[1]
  // const dummyImage = 'https://picsum.photos/250/150'
  // const dummyImage2 = '/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg'
  const sentenceCase = property.houseCategory.charAt(0).toUpperCase() + property.houseCategory.slice(1).toLowerCase();
  // const  = property.houseCategory.charAt(0).toUpperCase() + property.houseCategory.slice(1).toLowerCase();
  // console.log(property)
  const amenities = property.amenities
  const [vacantUnitsCount, setVacantUnitsCount] = useState(0);
  const handleChangeVacancyStatus = (e) => {
    const { checked } = e.target;
    const vacancyStatus = checked ? 'vacant' : 'occupied';
    // Update vacancy status in the backend or state
    console.log(`Property ${propertyId} is now ${vacancyStatus}`);
  }

  useEffect(() => {
    const vacantUnits = properties.filter(property => property.status === 'vacant');
    setVacantUnitsCount(vacantUnits.length);
  }, [properties]);


  return (
    <div className='inner-card'>
      <div className='propert-image'>
        <img src={image1} alt={property.propertyTitle} />
      </div>

      <div>
        <h4>{property.propertyTitle}</h4>   
        <hr />
        <p><i class="fa fa-home" aria-hidden="true"></i> {property.houseCategory}</p>    
        <p><i className="fa-solid fa-location-dot"></i> {mainlocation}, {subLocation}</p>
        <p><i class="fa fa-road" aria-hidden="true"></i> {distanceFromMainRoad}  metres from Main road</p>
        <p><i className="fa-solid fa-hand-holding-dollar"></i> Ksh.{property.price}</p>
      </div>
      
      <div className='price'>
        {/*{isVacant ? (
                <p className='btn vacant btn-warning text-center m-auto mb-2'>
                    Vacant
                </p>
            ) : (
                <p className='btn occupied btn-secondary text-center m-auto mb-2'>
                    Occupied
                </p>
            )}
       <p> <strong>Call/Text 0712345678</strong></p>  
      <h5>Number of Vacant Units Available: {property.subLocation}</h5>  */}
        {/* <h5 className='btn btn-secondary m-auto mb-4'>Contact :<br/> {property.contact}</h5>*/}

        <div className='d-flex justify-content-center gap-3'>
          <Link
            to={`/viewhouses/${property.propertyId}`}
            className='btn mb-2 btn-secondary'
          >
            More info
          </Link>
          {/*<Link
          to={`/viewhouses/${property}`}
          className='btn btn-secondary'
        >
          Other units
    </Link>}*/}
        </div>
        </div>
        {/* <hr /> */}
      </div>
      )
}

      export default PropertyCard