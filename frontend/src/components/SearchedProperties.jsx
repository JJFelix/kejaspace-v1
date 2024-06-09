import React, { useEffect, useState } from 'react'
import './FeaturedProperties.css'
import axios from 'axios'

const SearchedProperties = () => {
    const [properties, setProperties] = useState([])
    const [selectedProperty, setSelectedProperty] = useState(null)
    // const [searchedProperties, setSearchedProperties] = useState([])
    const searchedProperties = []

    const handlePropertyClick = (property) => {
        setSelectedProperty(property)
    }

    useEffect(()=>{
        axios.get(
            'https://backend.kejaspace.com/'
            // 'http://localhost:5000/'
            )
        .then(response =>{
            setProperties(response.data)
            // console.log('properties',properties)
            // array.forEach(element => {
                
            // })
            const houseType = localStorage.getItem('houseType')
            const houseCategory = localStorage.getItem('houseCategory')
            const min_price = localStorage.getItem('min_price')
            const max_price = localStorage.getItem('max_price')
            const location = localStorage.getItem('location')
            console.log(houseType)
            properties.map((property)=>{
                if (
                    property.houseType == houseType && 
                    property.houseCategory == houseCategory 
                    // &&
                    // property.location == houseData.location
                    // houseData.min_price < property.price < houseData.max_price
                ) {
                    console.log(property)
                    searchedProperties.push(property)                                
                }
            })
            console.log(searchedProperties)
            })
            .catch(error =>{
                console.log(error)
            })
    }, [])
    // console.log('properties',properties)
    // console.log(selectedProperty.images)
  return (
    <>
        <div className="main-wrapper">
            <h2>Searched Properties</h2>
            {searchedProperties &&(
                searchedProperties.map((property, index)=>(
                    <div key={index}>
                        {property.houseType}
                    </div>
                ))
            )}
        </div>
    </>
  )
}

export default SearchedProperties