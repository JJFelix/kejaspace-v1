import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteProperty = () => {
    // const {propertyData} = localStorage.getItem('propertyDetails')
    const {propertyId} = useParams()
    console.log(propertyId)

    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [errorr, setErrorr] = useState(null)

    const handleDelete = () =>{
        const token = localStorage.getItem('sessionToken')
        axios
            .delete(`https://backend.kejaspace.com/profile/deleteproperty/${propertyId}`, {
                headers:{ 
                    'authorization': token}
            })
            .then((res)=>{
                console.log(res)
                setSuccess(res.data.success)   
                
            })
            .catch((err)=>{
                console.error(err)
                setError(err.response.data.err)
                setErrorr("Could not delete property. Try again")
            })
    }

    const navigate = useNavigate()

    const handleCancel = (e) =>{
        e.preventDefault()
        navigate('/profile')
    }

    useEffect(()=>{
        let timer
            if(success){
                timer = setTimeout(()=>{
                    navigate('/profile')
                }, 500)
            }
            return () => clearTimeout(timer)
    }, [success, navigate])

  return (
    <>
        <div className='main-wrapper'>
             {/* container d-flex flex-column'> */}
            <h2>Delete Property</h2>
            {errorr && <div className='alert alert-danger'>{errorr}</div>}
            {success && <div className='alert alert-success'>{success}. Redirecting to profile page shortly.</div>}
            <p>Confirm you want to delete this property?</p>
            <div className='d-flex justify-content-center gap-3'>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                <button className='btn btn-info' onClick={handleCancel}>Cancel</button>
            </div>
        </div>        
    </>
  )
}

export default DeleteProperty