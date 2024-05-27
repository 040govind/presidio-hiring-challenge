import React, { useState } from 'react';
import '../styles/addproperty.css'; // Import CSS file for styling
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateProperty = () => {

    const location = useLocation();
  const { property } = location.state || {};
  const [formData, setFormData] = useState({
    id:property._id,
    name: property.name,
    description: property.description,
    noOfBadroom:property.noOfBadroom,
    noOfBathroom:property.noOfBathroom,
    nearByHospital:property.nearByHospital,
    address: property.address,
    city: property.city,
    state: property.state,
    country: property.country,
    image:property.image,
    price: property.price,
    owner:property.owner
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData); 
    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      !formData.noOfBadroom ||
      !formData.noOfBathroom ||
      !formData.nearByHospital ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.image ||
      !formData.price
    ) {
      alert('All fields are required.');
      return;
    }

    if (formData.price < 0) {
      alert('Price must be a positive number.');
      return;
    }
    try {
      
      const response= await  axios.put('https://presidio-hiring-challenge-five.vercel.app/api/v1/seller/update-property', formData, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
      });

      if(response.status === 200){
         alert("Property Updated Succesfully");
         navigate('/view-properties');
         
      }
      else if(response.status === 401){
        alert("Erroe while updating  Property please try again");
      }
    } catch (error) {
      console.error('Property update  failed  :', error.response.data.message);
      alert('updating Property failed.');
    }// You can perform further actions here, like sending the data to a server
  };

  return (
    <div className="property-form-container">
      <h1>Update  Property Details</h1>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="noOfBadroom">Number Of Badroom:</label>
          <input type='number' name="noOfBadroom" value={formData.noOfBadroom} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="noOfBathroom">Number Of Bathroom:</label>
          <input type='number' name="noOfBathroom" value={formData.noOfBathroom} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="nearByHospital">Nearby Hospital Name:</label>
          <input type='text' name="nearByHospital" value={formData.nearByHospital} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-control" />
        </div>
        
        
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
