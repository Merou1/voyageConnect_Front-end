import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneHotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/api/hotels/${id}`, {
                    withCredentials: true,
                });
                setHotel(result.data);
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
        <div>
            <h2>Hotel Details</h2>
            {hotel.imageUrl && (
                <div className="hotel-image">
                    <img 
                        src={hotel.imageUrl} 
                        alt={hotel.name}
                        style={{ maxWidth: '400px', marginBottom: '20px' }}
                    />
                </div>
            )}
            <h3><strong>Name:</strong> {hotel.name}</h3>
            <h3><strong>Location:</strong> {hotel.location}</h3>
            <h3><strong>Price per Night:</strong> {hotel.pricePerNight} <strong>Dh</strong></h3>
            <h3><strong>Rating:</strong> {hotel.stars} ⭐</h3>
            <h3><strong>Description:</strong> {hotel.description}</h3>
        </div>
    );
};

export default OneHotel;