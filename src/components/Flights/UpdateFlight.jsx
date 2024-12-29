import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./flight.css";

const UpdateFlight = () => {
  const [offers, setOffers] = useState([]);
  const [airline, setAirline] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [price, setPrice] = useState("");
  const [offerId, setOfferId] = useState(null);
  const {flightId} = useParams();


  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/flight/${flightId}`, {
          withCredentials: true,
        });
        const flight = response.data;
        setAirline(flight.airline);
        setDeparture(flight.departure);
        setDestination(flight.destination);
        setDepartureDate(flight.departureDate);
        setReturnDate(flight.returnDate);
        setPrice(flight.price);
        setOfferId(flight.offer?.id || null);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    const fetchOffers = async () => {
      try {
        const result = await axios.get("http://localhost:8080/admin/offers", {
          withCredentials: true,
        });
        setOffers(result.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchFlightDetails();
    fetchOffers();
  }, [flightId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFlight = {
      airline,
      departure,
      destination,
      departureDate,
      returnDate,
      price: parseFloat(price),
      offer: { id: offerId },
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/flights/${flightId}`, updatedFlight, {
        withCredentials: true,
      });
      console.log("Flight updated successfully:", response.data);
      alert("Flight updated successfully!");
    } catch (err) {
      console.error("Error updating flight:", err);
      alert("Error updating flight. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            placeholder="Airline"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <select
            onChange={(e) => setOfferId(e.target.value)}
            value={offerId}
            required
          >
            <option value="" disabled>
              -- Select an Offer --
            </option>
            {offers.map((offer) => (
              <option key={offer.id} value={offer.id}>
                {offer.offerDetails} -- Id: {offer.id}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Flight</button>
      </form>
    </div>
  );
};

export default UpdateFlight;
