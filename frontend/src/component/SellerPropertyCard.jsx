import React, { useState, useEffect } from "react";
import "../styles/sellerpropertycard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SellerPropertyCard = ({ property, setLoad }) => {
  const navigate = useNavigate();

  const handleNavigateToUpdate = (id,property) => {
    //console.log(property);
    navigate(`/update-property/${id}`, { state: { property } });
  };
  const handleDelete = async (id) => {
    try {
      //console.log(id);
      const response = await axios.delete(
        `https://presidio-hiring-challenge-five.vercel.app/api/v1/seller/delete-property/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setLoad(true);
        alert("Property delete succesfully");
      } else {
        alert("property not delete please  try again");
      }
    } catch (error) {
      alert("error occured while deleting the item");
    }
  };
  // useEffect(()=>{

  // },[load])
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
      </div>
      <div className="property-details">
        <h2>{property.name}</h2>
        <p>{property.description}</p>
        <p>
          <strong>No of Badroom:</strong> {property.noOfBadroom}
        </p>
        <p>
          <strong>No of Bathroom:</strong> {property.noOfBathroom}
        </p>
        <p>
          <strong>Near By Hospital:</strong> {property.nearByHospital}
        </p>
        <p>
          <strong>Place:</strong> {property.address}
        </p>
        <p>
          <strong>City:</strong> {property.city}
        </p>
        <p>
          <strong>State:</strong> {property.state}
        </p>
        <p>
          <strong>Country:</strong> {property.country}
        </p>
        <p>
          <strong>Price:</strong> {property.price}
        </p>
        <div className="property-actions">
          <button className="update-button" onClick={()=>handleNavigateToUpdate(property._id,property)}>Update</button>
          <button
            className="delete-button"
            onClick={() => handleDelete(property._id)}
          >
            Delete
          </button>
        </div>
        <div className="like-count">
          <FontAwesomeIcon icon={faHeart} /> 100
        </div>
      </div>
    </div>
  );
};

export default SellerPropertyCard;
