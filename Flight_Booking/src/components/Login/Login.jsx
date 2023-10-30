import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Send a POST request to the server to log in the user
    axios.post("http://localhost:3333/login", formData)
    .then((response) => {
      console.log("Login successful:", response.data);
      if(response.data.status === 'ok'){
        alert('Login successful ');
        localStorage.setItem('token', response.data.token); // เซ็ตค่า token ใน localStorage
        navigate('/user');
      } else {
        alert('Invalid username or password');
      }
        // Handle the successful login response (e.g., store tokens, redirect)
      })
      .catch((error) => {
        console.error("Login error:", error.response.data);
        // Handle login error (e.g., show an error message)
        alert("Incorrect information. Please check your credentials.");
      });
  };

  return (
    <>
      <div className="bg">
        <div className="img"></div>
        <div className="regis">
          <h3>Login</h3>

          <div className="regis-input">
            <div className="regis-input-username">
              Username
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="regis-input-password">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="regis-input-submit">
              <button onClick={handleSubmit}>Login</button>
              <div className="regis-input-submit-toregister">
                Don't have an account ? <Link to="/signin">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
