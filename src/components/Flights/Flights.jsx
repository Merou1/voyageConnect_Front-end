import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './flight.css';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [offerDetails, setOfferDetails] = useState({}); // Object to store offer descriptions

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/flights", {
                    withCredentials: true,
                });
                const data = result.data;
                console.log("Flights:", data);
                setFlights(data);

                // Fetch offer descriptions
                const offerDescriptions = {};
                for (const flight of data) {
                    if (flight.offerId) {
                        offerDescriptions[flight.offerId] = "Loading...";
                        fetchOfferDescription(flight.offerId, offerDescriptions);
                    }
                }
            } catch (err) {
                console.error("Error fetching flights:", err);
            }
        };

        const fetchOfferDescription = async (offerId, offerDescriptions) => {
            try {
                const url = `http://localhost:8080/admin/offer/${offerId}`;
                const result = await axios.get(url, {
                    withCredentials: true,
                });
                offerDescriptions[offerId] = result.data.offerDetails;
                setOfferDetails({ ...offerDescriptions });
            } catch (err) {
                console.error(`Error fetching offer description for ID ${offerId}:`, err);
                offerDescriptions[offerId] = "Error fetching data";
                setOfferDetails({ ...offerDescriptions });
            }
        };

        fetchFlights();
    }, []);

    const handleFlightDelete = async (id) => {
        try {
            // Add delete functionality here
        } catch (err) {
            console.error(err);
            alert("Error while deleting the flight");
        }
    };

    return (
        <div className="FlightsList">
            <div>
                <Link to="/flights/add"><h3>Add Flight</h3></Link>
            </div>
            <h2>Flights List</h2>
            {
                flights.length === 0
                    ? <p>Loading...</p>
                    : <table>
                        <thead>
                            <tr>
                                <th>Airline</th>
                                <th>Departure</th>
                                <th>Departure Date</th>
                                <th>Destination</th>
                                <th>Offer</th>
                                <th>Price</th>
                                <th>Return Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                flights.map((flight, index) => (
                                    <tr key={index}>
                                        <td>{flight.airline}</td>
                                        <td>{flight.departure}</td>
                                        <td>{flight.departureDate}</td>
                                        <td>{flight.destination}</td>
                                        <td>
                                            ID : {flight.offerId} Description: <br />
                                            {offerDetails[flight.offerId] || "Loading..."}
                                        </td>
                                        <td>{flight.price}</td>
                                        <td>{flight.returnDate}</td>
                                        <td className="td">
                                            <Link to={`/flights/update/${flight.id}`}>
                                                <button >Edit</button>
                                            </Link>
                                            <button  onClick={() => handleFlightDelete(flight.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default Flights;
