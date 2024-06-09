import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.css' 
import axios from 'axios'

const AddProperties = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [propertyData, setPropertyData] = useState({
    propertyTitle: "",
    propertyType: "",
    propertyCategory: "",
    mainLocation: "",
    subLocation: "",
    distanceFromMainRoad: "",
    description: "",
    contact: "",
    profilePic: {
      picName: "",
      picContent: ""
    },
    /*amenities: {
      water: { selected: false },
      garbageCollection: { selected: false, pricePerMonth: "" },
      electricity: { selected: false },
      cctv: { selected: false },
      security: { selected: false }
    }*/
  })

  const navigate = useNavigate()

  const handleInputChange = (e) =>{
    const { name, value, files } = e.target

    if (name === 'profilePic') {
      const file = files[0];
  
      const reader = new FileReader();
      reader.onload = (event) => {
        setPropertyData({
          ...propertyData,
          profilePic: {
            picName: file.name,
            picContent: event.target.result.split(',')[1], // Extracting the base64 content
          },
        });
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    
    }
    /*
    else if (name in propertyData.amenities) {
      setPropertyData({
        ...propertyData,
        amenities: {
          ...propertyData.amenities,
          [name]: value === 'Yes' ? true : false,
        },
      });
    } */else {
      // Handle other input fields
      setPropertyData({
        ...propertyData,
        [name]: value,
      });
    }
}


  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(propertyData)
    const token = localStorage.getItem("sessionToken")
    axios
      .post('https://backend.kejaspace.com/profile/addproperty', propertyData, {
        headers:{
            'authorization': token
        }
        
      })
      .then(response =>{
        setSuccess('Property added successfully')
        setError(null)
        navigate('/profile')
      })
      .catch(error =>{
        console.error(error)
        setError('Failed to add property. Please try again')
        console.log('err',  response)
      })
  }

  return (
    <div className='main-wrapper'>
      <div>
        <h3>Add Property</h3>
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

      <div>
        <form className='register-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="propertyTitle" className="form-label">Property Title</label>
            <input name="propertyTitle" value={propertyData.propertyTitle} onChange={handleInputChange} type='text' className="form-control" id="propertyTitle" aria-describedby="propertyTitle"  required/>
          </div>
          <div className="mb-3">
            <label htmlFor="propertyType" className="form-label">Property Type</label>: 
            <select name="propertyType" id="propertyType" value={propertyData.propertyType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example" required>
              <option> </option>
              <option>Commercial</option>
              <option>Residential</option>
              <option >Both</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="mainLocation" className="form-label">Main Location</label>
            <input name="mainLocation" value={propertyData.mainLocation} onChange={handleInputChange} type='text' className="form-control" id="mainLocation" aria-describedby="mainLocation" required />
          </div>
          <div className="mb-3">
            <label htmlFor="subLocation" className="form-label">Sub Location</label>
            <input name="subLocation" value={propertyData.subLocation} onChange={handleInputChange} type='text' className="form-control" id="subLocation" aria-describedby="subLocation" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="distanceFromMainRoad" className="form-label">Distance from Main Road</label>
            <input name="distanceFromMainRoad" value={propertyData.distanceFromMainRoad} onChange={handleInputChange} type='text' className="form-control" id="distanceFromMainRoad" aria-describedby="distanceFromMainRoad" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input name="contact" value={propertyData.contact} onChange={handleInputChange} type='text' className="form-control" id="contact" aria-describedby="contact" required />
          </div>
          
          <div className="mb-3">
            <label htmlFor="profilePic" className="form-label">Profile Picture</label>
            <input name='profilePic'   onChange={handleInputChange} type="file" className="form-control" id="profilePic" aria-describedby="profilePic" required />
          </div>
          
         


        
          <div className='d-flex'>
          <button type="submit" className=" button btn btn-primary">Submit</button>
          <button type="button" className="button btn btn-secondary" onClick={() => navigate('/profile')}>Back</button>

          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AddProperties

