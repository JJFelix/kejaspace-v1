import React, {useState, useEffect} from 'react'
import { Form, FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './RegisterForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setLocalStorageData } from './LoginForm'

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [sessionToken, setSessionToken] = useState('')
    const [userId, setUserId] = useState(null)

    const navigate = useNavigate()

    const handleInputChange = (e) =>{
        const { name, value } = e.target
        setUserData({
            ...userData, [name]:value
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios
            .post('https://backend.kejaspace.com/register', userData)
            .then((response)=>{
                // console.log(response)
                setSuccess("Registration successful")
                setError(null)
                const token = response.data.session_token
                const id = response.data.userId
                let userName

                setSessionToken(token)
                setUserId(id)

                localStorage.setItem('sessionToken', token)
                localStorage.setItem('userId', id)
                // localStorage.setItem('userName', userData.email)
                setLocalStorageData("userName", userData.email)

                console.log(`sessionToken: ${token}, userId: ${id}, userName: ${userName}`)
                navigate('/')
                window.location.reload(true)
            })
            .catch((error)=>{
                setError(error.response.data.error)
                setSuccess(null)
            })
    }
  return (
    <>
        <div>
            <h3>
                Register
            </h3>
           
        </div>
        {error && 
            <div className="alert alert-danger register-form">
                <p className='danger'>Error: {error}</p>
            </div>
        }
        {success &&
            <div className="alert alert-success register-form">
                <p>{success}</p>
            </div>
        }
        <form className='register-form' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="examplefirstName" className="form-label">First Name</label>
                <input name='firstName' value={userData.firstName} onChange={handleInputChange} type="text" className="form-control" id="examplefirstName"/>
            </div>
            <div className="mb-3">
                <label htmlFor="examplelastName" className="form-label">Last Name</label>
                <input name='lastName' value={userData.lastName} onChange={handleInputChange} type="text" className="form-control" id="examplelastName"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                <input name='email' value={userData.email} onChange={handleInputChange} type="text" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword" className="form-label">Password</label><br />
                <small>
                    * Minimum 8 characters <br />
                    * Atleast one uppercase letter <br />
                    * Atleast one special character <br />
                    * Atleast one number <br />
                </small>
                <input name='password' value={userData.password} onChange={handleInputChange} type="password" className="form-control" id="exampleInputPassword"/>
                
            </div>
            <button type="submit" className="btn btn-primary button">Register</button>
        </form>
        <div>
            <p>Sign up with <a className='text-decoration-none' href="#google-auth">Google</a></p>
        </div>
        <div>
            <p>Already registered? Login <a className='text-decoration-none' href="/login">here</a></p>
        </div>
    </>
  )
}

export default RegisterForm