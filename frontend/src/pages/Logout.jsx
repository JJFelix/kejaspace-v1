import React from 'react'
import { Button } from 'reactstrap'

const Logout = () => {
  
  return (
    <>
      <div>
        <h2>You have been logged out.</h2>        
          <Button className='btn btn-info'>
            Back to
            <a className='text-decoration-none' href="/login"> Login</a>
          </Button>
      </div>      
    </>
  )
}

export default Logout