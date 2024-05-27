import React, { useState } from 'react';
import '../styles/addproperty.css'; // Import CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    image: null,
    price: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
        ...formData,
        image: file
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
      
      const response= await  axios.post('https://presidio-hiring-challenge-five.vercel.app/api/v1/seller/add-property', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: localStorage.getItem('token'),
        },
      });

      if(response.status === 200){
         alert("Property Added Succesfully");
         //navigate('/add-property');
         setFormData({
          name: '',
          description: '',
          address: '',
          noOfBadroom:'',
          noOfBathroom:'',
          nearByHospital:'',
          city: '',
          state: '',
          country: '',
          image: null,
          price: ''
         })
      }
      else if(response.status === 401){
        alert("Erroe while Adding Property please try again");
      }
    } catch (error) {
      console.error('Property add failed  failed:', error.response.data.message);
      alert('Adding Property failed.');
    }// You can perform further actions here, like sending the data to a server
  };

  return (
    <div className="property-form-container">
      <h1>Add Property</h1>
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
          <label htmlFor="image">Image (JPG only):</label>
          <input type="file" accept=".jpg" name="image" onChange={handleImageChange} className="form-control-file" />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;
