import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateHouse = () => {
    const propertyId = localStorage.getItem('propertyId')
    const {houseId} = useParams()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const selectedHouse = JSON.parse(localStorage.getItem("selectedHouse"))

    const [houseData, setHouseData] = useState({
        houseType: selectedHouse.houseType,
        houseCategory: selectedHouse.houseCategory,
        price: parseInt(selectedHouse.price),
        description: selectedHouse.description,
        images:[
            {
                picName: '', 
                picContent:"base64"
            }
        ],
        amenities: selectedHouse.amenities
    })

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

    const categoryOptions = houseCategoryOptions[houseData.houseType] || []

    const handleInputChange = async (e) => {
        const { name, files } = e.target;
    
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
            [name]: e.target.value,
          }));
        }
    }
    
    const readAsDataURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => {
            resolve(reader.result);
            }

            reader.readAsDataURL(file);
        })
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(houseData)

      const token = localStorage.getItem('sessionToken');
      axios
        .put(`https://backend.kejaspace.com/profile/updateAdvert/${houseId}`, houseData, {
        headers: {
          'authorization': token,
        },
        })
        .then((response) => {
        setSuccess(response.data.success);
        setError(null);
        navigate(`/viewproperty/${propertyId}`)
        })
        .catch((error) => {
        console.error(error)
        setError(error.response.data.error)
        });
    }

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
      <h3>Update Unit</h3>
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
          <label htmlFor="houseType" className="form-label">House Type</label>: <br />
          <select name="houseType" id="houseType" value={houseData.houseType} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
            <option value=""> </option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="houseCategory" className="form-label">House Category</label>
          {/* <input name="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} type='text' className="form-control" id="houseCategory" aria-describedby="houseCategory" /> */}
          <select name="houseCategory" id="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
            {categoryOptions.map((category)=>(
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
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">House Images</label>
          <input name='images' onChange={handleInputChange} type="file" className="form-control" id="images" aria-describedby="images" multiple />
        </div>
        
        <button type="submit" className=" button btn btn-primary">UPDATE</button>
      </form>
    </div>
  </div>
)
}

export default UpdateHouse