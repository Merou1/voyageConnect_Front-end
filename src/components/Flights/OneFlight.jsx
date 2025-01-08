import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneFlight = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/api/flights/${id}`, {
                    withCredentials: true,
                });
                setFlight(result.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching flight details:", err);
                setLoading(false);
            }
        };

        fetchFlight();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!flight) return <p>No details found for this flight.</p>;

    return (
        <div>
            <h2>Flight Details</h2>
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Departure:</strong> {flight.departure}</p>
            <p><strong>Destination:</strong> {flight.destinationId}</p>
            <p><strong>Departure Date:</strong> {flight.departureDate}</p>
            <p><strong>Return Date:</strong> {flight.returnDate}</p>
            <p><strong>Price:</strong> {flight.price} <strong>Dh</strong></p>
        </div>
    );
};

export default OneFlight;