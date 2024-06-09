import React, { useState, useEffect } from "react";

import "./RegisterForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLocalStorageData } from "./LoginForm";

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sessionToken, setSessionToken] = useState("");
  const [userId, setUserId] = useState(null);

  const [passwordValidation, setPasswordValidation] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValidation(passwordRegex.test(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setConfirmPasswordError("Password do not match");
      return;
    }
    axios
      .post("https://backend.kejaspace.com/register", userData)
      .then((response) => {
        // console.log(response)
        setSuccess("Registration successful");
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
          `sessionToken: ${token}, userId: ${id}, userName: ${userName}`
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
    <>
      <div className="wrapper">
        <div className="container">
          <div className="text">
            <h6>Welcome To Keja Space</h6>
            <AiOutlineUser className="icon" />
            <h5>Register</h5>
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
                <FaUser />
              </span>

              <input
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="examplefirstName"
                required
              />

              <label htmlFor="examplefirstName" className="form-label">
                First Name
              </label>
            </div>
            <div className="input-wrapper">
              <span className="icon">
                <FaUser />
              </span>

              <input
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                id="examplelastName"
                required
              />
              <label htmlFor="examplelastName" className="form-label">
                Last Name
              </label>
            </div>
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
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                required
              />
              <label htmlFor="exampleInputEmail" className="form-label">
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
                id="exampleInputPassword"
                required
              />
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>

              {!passwordValidation && (
                <p className="text-danger">
                  Password must contain at least 8 characters, including an
                  uppercase letter, a lowercase letter, a digit, and a special
                  character.
                </p>
              )}
            </div>
            <div className="input-wrapper">
              <span className="icon">
                <FaLock />
              </span>
              <input
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                type="password"
                id="exampleInputConfirmPassword"
                required
              />
              <label htmlFor="exampleInputConfirmPassword">
                Confirm Password
              </label>
              {confirmPasswordError && (
                <p className="text-danger">{confirmPasswordError}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary button">
              Register
            </button>
          </form>
          <div>
            <p>
              Sign up with{" "}
              <a className="text-decoration-none" href="#google-auth">
                Google
              </a>
            </p>
          </div>
          <div>
            <p>
              Already registered? Login{" "}
              <a className="text-decoration-none" href="/login">
                here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
