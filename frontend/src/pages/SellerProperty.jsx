import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerPropertyCard from "../component/SellerPropertyCard";
const SellerProperty = () => {
  const [properties, setProperties] = useState([]);
  const [load ,setLoad] = useState(false);
  const fetchProperty = async()=>{
    try {
        const response= await  axios.get('http://localhost:8000/api/v1/seller/fetch-property', {
            headers: {
              'Content-Type': 'application/json',
               Authorization: localStorage.getItem('token'),
            },
          });

          if(response.status === 200){
            //console.log(response.data.data);
            setProperties(response.data.data);
          }
          else{
            alert("property not fetched try again");
          }
    } catch (error) {
        console.log(error);
       alert("some error while fetching the seller the property") ;
    }
  }

  useEffect(()=>{
    fetchProperty();
  },[load])
  return (
  <div style={{display:"flex", flexWrap:"wrap"}}>
      {properties.length !== 0 ? properties?.map(property => (
          <SellerPropertyCard key={property._id} property={property} setLoad={setLoad} />
        )): <h1 style={{textAlign:"center", alignItems:"center"}}>You have Not Added any Property Please Add if you have any</h1>}
  </div>
  );
};

export default SellerProperty;
