import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login_admin.css'

function Login_admin() {

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
        axios.post("http://localhost:3333/loginadmin", formData)
        .then((response) => {
          console.log("Login successful:", response.data);
          if(response.data.status === 'ok'){
            alert('Login successful ');
            localStorage.setItem('username', formData.username); //เช็ตค่า username ใน localStorage
            localStorage.setItem('token', response.data.token); // เซ็ตค่า token ใน localStorage
            navigate('/Admin');
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
        <div>
            <div className="main-login-admin">
                <div className="content-login-admin">
                    <h2>Login Admin</h2>
                    <div className="username-login-admin">
                        Username  <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                  />
                    </div>
                    <div className="password-login-admin">
                        Password  <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                  />
                    </div>
                    <button onClick={handleSubmit} className='btn-login-admin'>Login</button>
                </div>
            </div>
        </div>  
    )
}

export default Login_admin
