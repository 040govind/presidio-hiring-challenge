import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://presidio-hiring-challenge-five.vercel.app/api/v1/auth/login', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    // console.log(response.data.data);
    // console.log(response.status);
      if(response.status == 200){
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        // console.log(localStorage.getItem("token"));
        alert("Login SuccessFull");

        navigate('/');
      }
      else if(response.status == 401){
        alert("Email or Password Incorrect");
      }
      

      // Save token to local storage
      
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
