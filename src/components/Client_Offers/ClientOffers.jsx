import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './clientOffers.css'

const ClientOffers = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    country: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetch("http://localhost:8080/client/offers", {
        credentials: "include",
      })
        .then((response) => {
            if (response.ok) return response.json();
            if (response.status === 401) {
                // Redirect to login page
                window.location.href = "/login";
                return;
            }
            throw new Error("Failed to fetch offers");
        })
        .then((data) => setOffers(data))
        .catch((error) => console.error(error));
}, []);

  

  // Fetch offer details
  const fetchOfferDetails = (id) => {
    console.log("id in fetchofferdetals client side : "+id)
    axios.get(`http://localhost:8080/client/offers/${id}`, {
        withCredentials: true,
    })
      .then(response => {
        console.log("fetching offer details data : "+response.data.hotelId)
        setSelectedOffer(response.data)
    })
      .catch(error => console.error('Error fetching offer details:', error));
  };

  // Search offers with filters
  const handleSearch = () => {
    const params = new URLSearchParams(searchFilters).toString();
    console.log("search params : "+params)
    axios.get(`http://localhost:8080/client/offers/search?${params}`, {
        withCredentials: true,
    })
    .then(response => {
        console.log("Search offers response:", response.data);
        setOffers(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error('Error searching offers:', error));
  };

  return (
    <div className='offersClient'>
      <h1>Available Offers</h1>
      
      {/* Search Filters */}
      <div>
        <input 
          type="text" 
          placeholder="Country" 
          value={searchFilters.country}
          onChange={(e) => setSearchFilters({ ...searchFilters, country: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Min Price" 
          value={searchFilters.minPrice}
          onChange={(e) => setSearchFilters({ ...searchFilters, minPrice: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Max Price" 
          value={searchFilters.maxPrice}
          onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: e.target.value })}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Offers List */}
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            <h2>{offer.country} - {offer.destinationName} - ${offer.offerPrice}</h2>
            <button onClick={() => fetchOfferDetails(offer.id)}>View Details</button>
          </li>
        ))}
      </ul>

      {/* Offer Details */}
      {selectedOffer && (
        <div>
          <h2>Offer Details</h2>
          <h3><strong>Destination:</strong> {selectedOffer.destinationName}, {selectedOffer.country}</h3>
          <h3><strong>Hotel:</strong> {selectedOffer.hotelName} - <Link to={`/client-hotels/${selectedOffer.hotelId}`}>
              <strong>View Hotel Details</strong>
            </Link></h3>
          <h3><strong>Price per night:</strong> ${selectedOffer.pricePerNight}</h3>
          <h3><strong>Flight:</strong> {selectedOffer.airline} (Departure: {selectedOffer.departure}, Return: {selectedOffer.returnDate})</h3>
          <h3><strong>Total Price:</strong> ${selectedOffer.offerPrice}</h3>
          <h3><strong>Details:</strong> {selectedOffer.offerDetails}</h3>
        </div>
      )}
    </div>
  );
};

export default ClientOffers;
