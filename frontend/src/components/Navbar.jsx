import React, {useState} from 'react'
import './Navbar.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const getLocalStorageData = (key) => {
    const expirationTime = localStorage.getItem(key + '_ts')
    if (expirationTime && Date.now() > expirationTime) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_ts')
      return null; // Data expired
    }
    return localStorage.getItem(key)
  }

const NavBar = () =>{

    const [error, setError] = useState();
    const [isNavVisible, setIsNavVisible] = useState(false);

    const handleLogout = () =>{
        const userId = localStorage.getItem("userId")
        const sessionToken = localStorage.getItem("sessionToken")
        console.log(`User Id: ${userId}, sessionTokne: ${sessionToken}`)
        // localStorage.removeItem("sessionToken")
        // localStorage.removeItem('userId')

        axios
        .get(`https://backend.kejaspace.com/logout/${userId}`,{
            headers:{
                'authorization': sessionToken
            }
        })
        .then((response)=>{
            console.log('logged out')
            window.location.reload(true)            
        })
        .catch((error)=>{
            setError(error.response.data.error)
        })
        localStorage.removeItem("sessionToken")
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('userName' + '_ts')
        localStorage.removeItem('propertyId')
    }

    const userName = localStorage.getItem('userName')
    const profileImage = '/images/profile.jpeg'
    getLocalStorageData("userName")

  return (
    <div className="name-tag ">
        {/* <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div class="container-fluid p-3">
                <a class="navbar-brand me-5" href="#">Keja Space</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link me-3" aria-current="page" href="/">Home</a>
                        <a class="nav-link me-3" href="/profile">Profile</a>
                        <a class="nav-link me-3" href="/properties">Properties</a>
                    </div>

                    <div class="navbar-nav ml-auto">
                        <a class="nav-link ml-auto ml-auto" href="/register">Register</a>
                        <a class="nav-link ml-auto ml-auto" href="/login">Login</a>
                        <a class="nav-link ml-auto ml-auto" href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </nav> */}
        <header className='mx-auto' >
           
            {/* container */}
            <nav className='nav '>       
            <div > 
                
                <div className='text-white'>
                    

                    
                
                             
                    <ul className="nav-ul  align-items-center">
                        <div className='d-flex'>
                        <img src={profileImage} className='profile-image' alt="" />
                    <h4 className='nav-header'><b>Keja Space</b></h4>
                        </div>
                   

                        {/* {userName &&
                        <>
                            <Link to={'#'} className='nav-link me-0 text-decoration-none'>
                                <p className="nav-link active ">Hello, {userName}</p>
                            </Link>                              
                        </>                 
                        } */}
                        <Link to={'/'} className='nav-link '>
                            <p >HOME</p>
                        </Link> 
                        {userName && 
                            <Link to={'/profile'} className='nav-link'>
                                <p >PROFILE</p>
                            </Link>
                        }   
                        <Link to={'/about'} className='nav-link'>
                            <p >ABOUT US</p>
                        </Link>
                        <Link to={'/'} className='nav-link'>
                            <p >Contact Us</p>
                            
                        </Link>                     
                   
                      
                        {!userName &&
                        <div className='logs '>
                            <Link to={'/register'} className=' text-white'>
                                <button className='btn log-btn btn-success'>Register</button>
                            </Link>
                            <Link to={'/login'} className=' text-white'>
                                <button className='btn log-btn btn-success'>Login</button>
                            </Link>
                        </div>
                    }
                    {userName &&
                        <Link to={'/login'} onClick={handleLogout} className='text-white'>
                                      <button className='btn  log-Button btn-warning'>Logout</button>
                        </Link>
                        // <a href="/login" className='nav-link' onClick={handleLogout}>LOGOUT</a>
                    }           
                      </ul>         
                
               
                </div>
               
                </div>
                </nav>

                
             
                
           
                        
               
               
                
        
        </header>
        {error && 
            <div className="alert alert-danger register-form">
                <p className='danger'>Error: {error}</p>
            </div>
        }
        
    </div>
  );
}

export default NavBar

