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
            <p><strong>Name:</strong> {hotel.name}</p>
            <p><strong>Location:</strong> {hotel.location}</p>
            <p><strong>Price per Night:</strong> {hotel.pricePerNight} <strong>Dh</strong></p>
            <p><strong>Rating:</strong> {hotel.stars} ⭐</p>
            <p><strong>Description:</strong> {hotel.description}</p>
        </div>
    );
};

export default OneHotel;