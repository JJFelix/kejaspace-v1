import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddHouse = () => {
  const { propertyId } = useParams()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [houseData, setHouseData] = useState({
    houseType: "",
    houseCategory: "",
    price: 0,
    description: "",
    availableUnits: 0,
    sizeOfUnit: "",
    unitLevel: "",
    amenities: {
      garbageCollection: { pricePerMonth: "" },
      water: { pricePerUnit: "" },
      electricity: "",
      balcony: "",
      wardrobe: "",
      kitchenCabinets: "",
      cctv: "",
      numberOfToilets: "",
      numberofBathrooms: "",
      numberofBedrooms: ""
    },
    images: [],
   
  })

  

  const navigate = useNavigate()

 

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'images' && files && files.length > 0) {
      const selectedImages = [];
      const fileReaders = [];
  
      for (const file of files) {
        fileReaders.push(readAsDataURL(file).then((picContent) => {
          if (picContent) {
            selectedImages.push({
              picName: file.name,
              picContent: picContent.split(',')[1], // Extracting the base64 content
            });
          }
        }).catch((error) => {
          console.error('Error reading file:', error);
        }));
      }
  
      await Promise.all(fileReaders);
  
      setHouseData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...selectedImages],
      }));
    } else {
      setHouseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
    const handleAmenityChange = (e) => {
      const { name, value } = e.target;
      setHouseData((prevData) => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [name]: value
        }
      }));
    };

    {/* const handleAmenityChange = (e) =>{
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
    }*/}

    
  
    // Helper function to read file content as data URL
    const readAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onloadend = () => {
          resolve(reader.result);
        };
    
        reader.onerror = reject;
    
        reader.readAsDataURL(file);
      });
    };
    const handleBackClick = () => {
      navigate('/');
      window.scrollTo(0, 0);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
       // Validation checks
       const requiredFields = {
        houseType: houseData.houseType,
        houseCategory: houseData.houseCategory,
        price: houseData.price,
        description: houseData.description,
        availableUnits: houseData.availableUnits,
        sizeOfUnit: houseData.sizeOfUnit,
        unitLevel: houseData.unitLevel,
        amenities: {
          garbageCollection: houseData.amenities.garbageCollection,
          water: houseData.amenities.water,
          electricity: houseData.amenities.electricity,
          balcony: houseData.amenities.balcony,
          wardrobe: houseData.amenities.wardrobe,
          kitchenCabinets: houseData.amenities.kitchenCabinets,
          cctv: houseData.amenities.cctv,
          numberOfToilets: houseData.amenities.numberOfToilets,
          numberofBathrooms: houseData.amenities.numberofBathrooms,
          numberofBedrooms: houseData.amenities.numberofBedrooms
        }
      };
  // Function to recursively check for empty fields
  const findEmptyFields = (obj, prefix = '') => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        findEmptyFields(obj[key], `${prefix}${key}.`);
      } else if (!obj[key] && !['numberOfToilets', 'kitchenCabinets', 'wardrobe', 'balcony', 'numberofBathrooms', 'numberofBedrooms'].includes(key)) {
        console.error(`Field ${prefix}${key} is empty or invalid`);
      }
    }
  };

  findEmptyFields(requiredFields);

  // Check if there were any empty fields
  const hasEmptyFields = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (hasEmptyFields(obj[key])) {
          return true;
        }
      } else if (!obj[key] && !['numberOfToilets','kitchenCabinets', 'wardrobe','balcony', 'numberofBathrooms', 'numberofBedrooms'].includes(key)) {
        return true;
      }
    }
    return false;
  };

  if (hasEmptyFields(requiredFields)) {
    setError('Please fill in all required fields');
    return;
  }
      console.log('housedata',houseData);
  
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
          console.log('Response:', response.data);
        
          navigate(`/viewproperty/${propertyId}`);
        })
        .catch((error) => {
          console.error('Error during submission:', error.response || error.message); // Added logging for error during submission
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
            <input name="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} type='text' className="form-control" id="houseCategory" aria-describedby="houseCategory" /> 
           { /*<select name="houseCategory" id="houseCategory" value={houseData.houseCategory} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                </option>
              ))}
            </select>*/}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Rent</label>
            <input name="price" value={houseData.price} onChange={handleInputChange} type='number' className="form-control" id="price" aria-describedby="availableUnits" />
          </div>

          <div className="mb-3">
            <label htmlFor="availableUnits" className="form-label">Number of available Units</label>
            <input name="availableUnits" value={houseData.availableUnits} onChange={handleInputChange} type='number' className="form-control" id="price" aria-describedby="price" />
          </div>
         
          <div className='p-2'>
            <h5 className='mb-2'><u>Unit Description</u></h5>
            </div>

            <div className="mb-3">
            <label htmlFor="unitLevel" className="form-label">Level of the Unit</label>
            <select name="unitLevel" id="unitLevel" value={houseData.unitLevel} onChange={handleInputChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
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
            <label htmlFor="sizeOfUnit" className="form-label">Size of the Unit</label>
            <input name="sizeOfUnit" value={houseData.sizeOfUnit} onChange={handleInputChange} type='text' className="form-control" id="sizeOfUnit" aria-describedby="sizeOfUnit" />
          </div>
         
          <div className="mb-3">
            <label htmlFor="balcony" className="form-label">Presence of a Balcony</label>
            <select name="balcony" id="balcony" value={houseData.amenities.balcony} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="wardrobe" className="form-label">Availability of Wardrobes</label>
            <select name="wardrobe" id="wardrobe" value={houseData.amenities.wardrobe} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="kitchenCabinets" className="form-label">Availability of Kitchen Cabinets</label>
            <select name="kitchenCabinets" id="kitchenCabinets" value={houseData.amenities.kitchenCabinets} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          
          <div className='p-2'>
            <h5 className='mb-2'><u>Amenities Available</u></h5>
          <div className="mb-3">
            <label htmlFor="water" className="form-label">Water (Price per Unit)</label>
            <input name="water" value={houseData.amenities.water.pricePerUnit} onChange={handleAmenityChange} type='number' className="form-control" id="water" aria-describedby="water" />
          </div>
          <div className="mb-3">
              <label htmlFor="garbageCollection" className="form-label">Garbage Collection (Price per Month)</label>
              <input name="garbageCollection" value={houseData.amenities.garbageCollection.pricePerMonth} onChange={handleAmenityChange} type='number' className="form-control" id="garbageCollection" aria-describedby="garbageCollection" />
            </div>
          <div className="mb-3">
            <label htmlFor="numberOfToilets" className="form-label">Number Of Toilets</label>
            <input name="numberOfToilets" value={houseData.amenities.numberOfToilets} onChange={handleAmenityChange} type='number' className="form-control" id="numberOfToilets" aria-describedby="numberOfToilets" />
          </div>
          <div className="mb-3">
            <label htmlFor="electricity" className="form-label">Electricity</label>
            <select name="electricity" id="electricity" value={houseData.amenities.electricity} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cctv" className="form-label">CCTV</label>
            <select name="cctv" id="cctv" value={houseData.amenities.cctv} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="security" className="form-label">Security</label>
            <select name="security" id="security" value={houseData.amenities.security} onChange={handleAmenityChange} className='form-select form-select-sm' aria-label=".form-select-sm example">
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-3">
              <label htmlFor="numberofBathrooms" className="form-label">Number of Bathrooms</label>
              <input name="numberofBathrooms" value={houseData.amenities.numberofBathrooms} onChange={handleAmenityChange} type='number' className="form-control" id="numberofBathrooms" aria-describedby="numberofBathrooms" />
            </div>
            <div className="mb-3">
              <label htmlFor="numberofBedrooms" className="form-label">Number of Bedrooms</label>
              <input name="numberofBedrooms" value={houseData.amenities.numberofBedrooms} onChange={handleAmenityChange} type='number' className="form-control" id="numberofBedrooms" aria-describedby="numberofBedrooms" />
            </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description of the Uploaded Unit</label>
            <textarea name="description" value={houseData.description} onChange={handleInputChange} className="form-control" id="description" aria-describedby="description" />
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">House Images</label>
            <input name='images' onChange={handleInputChange} type="file" className="form-control" id="images" multiple aria-describedby="images" />
          </div>
          <div className='d-flex'>
          <button type="submit" className=" button btn btn-primary">Submit</button>
          <button type="button" className="button btn btn-secondary" onClick={handleBackClick}>Back</button>

          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AddHouse
