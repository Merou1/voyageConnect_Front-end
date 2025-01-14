import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './oneHotelClient.css';

const OneHotelClient = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/hotels/${id}`, {
          withCredentials: true,
        });
        setHotel(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!hotel) return <p>No details found for this hotel.</p>;

  return (
    <div className="hotel-details-container">
      <h2 className="hotel-title">Hotel Details</h2>
      <div className="hotel-card">
        {hotel.imageUrl && (
          <div className="hotel-image-container">
            <img 
              src={hotel.imageUrl} 
              alt={hotel.name}
              className="hotel-image"
            />
          </div>
        )}
        <div className="hotel-info">
          <h3><strong>Name:</strong> {hotel.name}</h3>
          <h3><strong>Location:</strong> {hotel.location}</h3>
          <h3><strong>Price per Night:</strong> {hotel.pricePerNight} <strong>Dh</strong></h3>
          <h3><strong>Rating:</strong> {hotel.stars} ⭐</h3>
        </div>
      </div>
    </div>
  );
};

export default OneHotelClient;
