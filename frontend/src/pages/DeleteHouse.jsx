import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteHouse = () => {
    const {houseId} = useParams()
    console.log(houseId)

    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [errorr, setErrorr] = useState(null)

    const navigate = useNavigate()
    const propertyId = localStorage.getItem('propertyId')

    const handleDelete = () =>{
        const token = localStorage.getItem('sessionToken')
        axios
            .delete(`https://backend.kejaspace.com/profile/deletehouse/${houseId}`, {
                headers:{ 
                    'authorization': token}
            })
            .then((res)=>{
                console.log(res)
                setSuccess(res.data.success)
                // localStorage.removeItem('propertyId')
            })
            .catch((err)=>{
                console.log(err)
                setError(err.response.data.error)
                setErrorr("Could not delete unit. Try again")
            })

    }

    const handleCancel = (e) =>{
        e.preventDefault()
        navigate(`/viewproperty/${propertyId}`)
    }

    useEffect(()=>{
        let timer
            if(success){
                timer = setTimeout(()=>{
                    navigate(`/viewproperty/${propertyId}`)
                }, 500)
            }
            return () => clearTimeout(timer)
    }, [success, navigate])

  return (
    <>
        <div className='main-wrapper'>
            <h2>Delete Unit</h2>
            {errorr && <div className='alert alert-danger'>{errorr}</div>}
            {success && <div className='alert alert-success'>{success}. Redirecting to properties page shortly.</div>}
            <p>Confirm you want to delete this house?</p>
            <div className='d-flex justify-content-center gap-3'>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                <button className='btn btn-info' onClick={handleCancel}>Cancel</button>
            </div>
        </div>        
    </>
  )
}

export default DeleteHouse