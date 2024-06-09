import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddHouse = () => {
  const { propertyId } = useParams()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [houseData, setHouseData] = useState({
      houseType:"",
      houseCategory:"",
      price:0,
      description:"",
      images:[
          {
              picName: '', 
              picContent:"base64"
          }
      ],
      amenities: [],
    mainLocation: "",
    subLocation: "",
    distanceFromMainRoad: "",
    unitSize: "",
    unitLevel: "",
    balcony: "",
    wardrobes: "",
    kitchenCabinets: "",
    waterPrice: 0,
    garbagePrice: 0,
    electricityType: "",
    cctv: "",
    security: ""
  })

  const amenitiesOptions = ["Water", "Electricity", "Internet Connection", "Lighting", "City viewscape"]

  const navigate = useNavigate()

  //mapping of houseType to houseCategory
  const houseCategoryOptions = {
    commercial:[
      'office spaces', 'godowns and warehouses', 'showrooms',
      'shops and rental spaces', 'hotels and restaurants',
      'rental halls'
    ],
    residential:[
      'studio apartments', 'bedsitter', 'one bedroom',
      'two bedroom', 'three bedroom', 'bungalow and mansion'
    ]
  }

  const categoryOptions = houseCategoryOptions[houseData.houseType] || [];

  const handleInputChange = async (e) => {
      const { name, value, files } = e.target;
  
      if (name === 'images' && files && files.length > 0) {
        const selectedImages = [];
  
        for (const file of files) {
          try {
            const picContent = await readAsDataURL(file);
  
            if (picContent) {
              selectedImages.push({
                picName: file.name,
                picContent: picContent.split(',')[1], // Extracting the base64 content
              });
            }
          } catch (error) {
            console.error('Error reading file:', error);
          }
        }
  
        setHouseData((prevData) => ({
          ...prevData,
          images: selectedImages,
        }));
      } else {
        setHouseData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }

    const handleAmenityChange = (e) =>{
      const amenity = e.target.value

      setHouseData((prevData)=>{
        if (e.target.checked){
          return {...prevData, amenities:[...prevData.amenities, amenity]}
        } else{
          return {
            ...prevData,
            amenities: prevData.amenities.filter((a) => a !== amenity),
          }
        }
      })
    }
  
    // Helper function to read file content as data URL
    const readAsDataURL = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          resolve(reader.result);
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(houseData);
  
      const token = localStorage.getItem('sessionToken');
      axios
        .post(`https://backend.kejaspace.com/profile/addhouse/${propertyId}`, houseData, {
          headers: {
            'authorization': token,
          },
        })
        .then((response) => {
          setSuccess('Unit added successfully');
          setError(null);
          // navigate(`/viewproperty/${propertyId}`)
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to add unit. Please try again');
        });
    };

    useEffect(()=>{
      let timer
          if(success){
              timer = setTimeout(()=>{
                navigate(`/viewproperty/${propertyId}`)
              }, 5000)
          }
          return () => clearTimeout(timer)
    }, [success, navigate])

  return (
    <div className='main-wrapper'>
      <div>
        <h3>Add Unit</h3>
      </div>

      {error && 
          <div className="alert alert-danger register-form">
              <p className='danger'>{error}</p>
          </div>
        }
        {success &&
          <div className="alert alert-success register-form">
              <p>{success}. Redirecting shortly to property page</p>
          </div>
        }

      <div>
        <form className='register-form' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="houseType" className="form-label">Unit Type</label>: <br />
            <select name="houseType" id="houseType" value={houseData.houseType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""> </option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="houseCategory" className="form-label">Unit Category</label>
            {/* <input name="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} type='text' className="form-control" id="houseCategory" aria-describedby="houseCategory" /> */}
            <select name="houseCategory" id="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input name="price" value={houseData.price} onChange={handleInputChange} type='number' className="form-control" id="price" aria-describedby="price" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input name="description" value={houseData.description} onChange={handleInputChange} type='text' className="form-control" id="description" aria-describedby="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="amenities" className="form-label">Amenities</label>
            <input name="amenities" value={houseData.amenities} onChange={handleInputChange} type='text' className="form-control" id="amenities" aria-describedby="amenities" />
              {amenitiesOptions.map((amenity)=>(
                <div key={amenity} className='form-check'>
                  <input type="checkbox"  name="amenities"
                    value={amenity}
                    id={`amenity-${amenity}`}
                    checked={houseData.amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                  />
                  <label htmlFor={`amenity-${amenity}`} className="form-check-label"> {amenity}</label>
                </div>
              ))} 
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">House Images</label>
            <input name='images' onChange={handleInputChange} type="file" className="form-control" id="images" multiple aria-describedby="images" multiple />
          </div>
          
          <button type="submit" className=" button btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddHouse
