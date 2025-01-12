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
            <h3><strong>Airline:</strong> {flight.airline}</h3>
            <h3><strong>Departure:</strong> {flight.departure}</h3>
            <h3><strong>Destination:</strong> {flight.destinationId}</h3>
            <h3><strong>Departure Date:</strong> {flight.departureDate}</h3>
            <h3><strong>Return Date:</strong> {flight.returnDate}</h3>
            <h3><strong>Price:</strong> {flight.price} <strong>Dh</strong></h3>
        </div>
    );
};

export default OneFlight;