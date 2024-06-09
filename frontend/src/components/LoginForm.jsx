import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import "./RegisterForm.scss";
import "./LoginForm.scss";
import axios from "axios";

import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

export const setLocalStorageData = (key, value) => {
  const expirationTime = Date.now() + 60 * 60 * 1000; // 30 minutes in milliseconds
  localStorage.setItem(key + "_ts", expirationTime); // Store expiration timestamp
  localStorage.setItem(key, value);
};

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sessionToken, setSessionToken] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://backend.kejaspace.com/login", userData)
      .then((response) => {
        // console.log(response)
        setSuccess("Login Successful");
        setError(null);
        const token = response.data.session_token;
        const id = response.data.userId;
        let userName;

        setSessionToken(token);
        setUserId(id);

        localStorage.setItem("sessionToken", token);
        localStorage.setItem("userId", id);
        // localStorage.setItem('userName', userData.email)
        setLocalStorageData("userName", userData.email);
        console.log(
          `Session token: ${token}, userId: ${id}, userName: ${userName}`
        );

        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setSuccess(null);
      });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="text">
          <h6>Welcome To Keja Space</h6>
          <AiOutlineUser className="icon" />
          <h5>
            <strong>Login</strong>
          </h5>
        </div>
        {error && (
          <div className="alert alert-danger register-form">
            <p className="danger">Error: {error}</p>
          </div>
        )}
        {success && (
          <div className="alert alert-success register-form">
            <p>{success}</p>
          </div>
        )}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="icon">
              <MdEmail />
            </span>

            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
          </div>
          <div className="input-wrapper">
            <span className="icon">
              <FaLock />
            </span>

            <input
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary button">
            Login
          </button>
        </form>
        {/* <div>
            <p>Log in with <a className='text-decoration-none' href="#google-auth">Google</a></p>
        </div> */}
        <div>
          <p>
            Not registered? Sign up{" "}
            <a className="text-decoration-none" href="/register">
              here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
