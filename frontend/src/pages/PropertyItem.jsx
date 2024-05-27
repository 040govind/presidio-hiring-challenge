import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyItemCard from "../component/PropertyItemCard";
import '../styles/propertyitem.css';

const PropertyItem = () => {
  const [properties, setProperties] = useState([]);
  const [likes,setLikes]=useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [oldData, setOldData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const search = (e) => {
    const data = e.target.value;
    setSearchQuery(data);

    const filteredProperties = oldData.filter(property => {
      const query = data.toLowerCase();
      return (
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query) ||
        property.country.toLowerCase().includes(query)
      );
    });

    setProperties(filteredProperties);
  }

  const fetchProperty = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/buyer/fetch-property', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        //console.log(response.data.data.likes);
        //setLikes(response.data.data.likes);
        setProperties(response.data.data);
        setOldData(response.data.data);
      } else {
        alert("Property not fetched, try again");
      }
    } catch (error) {
      console.log(error);
      alert("Some error while fetching the seller's property");
    }
  }

  const handleSortChange = (e) => {
    const order = e.target.value;
    let sortedProperties = [...properties];

    if (order === "ascending") {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if (order === "descending") {
      sortedProperties.sort((a, b) => b.price - a.price);
    }

    setProperties(sortedProperties);
  }

  useEffect(() => {
    fetchProperty();
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = properties.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(properties.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="property-container">
      <div className="search-box">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => search(e)}
          placeholder="Search by name, place, city, state, country"
        />
        <select onChange={handleSortChange}>
          <option value="">Sort by price</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="property-list">
        {currentRecords.length !== 0 ? currentRecords.map(property => (
          <PropertyItemCard key={property._id} property={property} />
        )) : <h1 style={{ textAlign: "center", alignItems: "center" }}>Properties are not present, please wait</h1>}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyItem;