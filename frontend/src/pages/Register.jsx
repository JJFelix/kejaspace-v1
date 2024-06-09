import React from 'react'
import RegisterForm from '../components/RegisterForm'


const Register = () => {
  const getData = (data) =>{
    console.log('Data from getData:', data)
    sendUserAuthRequest(data.inputs, data.signup)
    .then()
    .catch((err)=>console.log(err))
  }
  return (
    <div className='main-wrapper'>
      <RegisterForm  />
    </div>
  )
}

export default Register