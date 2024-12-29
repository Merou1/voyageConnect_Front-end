import axios from "axios";
import { useEffect, useState } from "react";
import "./flight.css";

const AddFlight = () => {
  const [offers, setOffers] = useState([]); 
  const [airline, setAirline] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [price, setPrice] = useState("");
  const [offerId, setOfferId] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const result = await axios.get("http://localhost:8080/admin/offers", {
          withCredentials: true,
        });
        const availableOffers = result.data.filter(
          (offer) => !offer.flightId // Filter offers without flightId
        );
        setOffers(availableOffers);
        if (availableOffers.length > 0) {
          setOfferId(availableOffers[0].id); // Pre-select the first available offer
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flight = {
      airline,
      departure,
      destination,
      departureDate,
      returnDate,
      price: parseFloat(price),
      offer: { id: offerId },
    };

    try {
      const response = await axios.post("http://localhost:8080/api/flights", flight, {
        withCredentials: true,
      });
      console.log("Flight added successfully:", response.data);
      alert("Flight added successfully!");
      setAirline("")
      setDeparture("")
      setDepartureDate("")
      setDestination("")
      setOfferId("")
      setPrice("")
    } catch (err) {
      console.error("Error adding flight:", err);
      alert("Error adding flight. Please try again.");
    }
  };

  return (
    <div >
      <h2>Add Flight</h2>
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
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
