import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./hotel.css";

const UpdateHotel = () => {
  const [offer, setOffer] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [stars, setStars] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [offerId, setOfferId] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/hotels/${hotelId}`, {
          withCredentials: true,
        });
        const hotel = response.data;
        setName(hotel.name);
        setLocation(hotel.location);
        setStars(hotel.stars);
        setPricePerNight(hotel.pricePerNight);
        setOfferId(hotel.offerId || null);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/offer/${offerId}`, {
          withCredentials: true,
        });
        setOffer(response.data);
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    };

    fetchHotelDetails();
    if (offerId) {
      fetchOffer();
    }
  }, [hotelId, offerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedHotel = {
      name,
      location,
      stars: parseFloat(stars),
      pricePerNight: parseFloat(pricePerNight),
      offer: { id: parseInt(offerId, 10) },
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/hotels/${hotelId}`, updatedHotel, {
        withCredentials: true,
      });
      console.log("Hotel updated successfully:", response.data);
      alert("Hotel updated successfully!");
    } catch (err) {
      console.error("Error updating hotel:", err);
      alert("Error updating hotel. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Rating"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
          />
          <select onChange={(e) => setOfferId(e.target.value)} value={offerId} required>
            <option value="" disabled>
              -- Select an Offer --
            </option>
            {offer && (
              <option key={offer.id} value={offer.id}>
                {offer.offerDetails} -- ID: {offer.id}
              </option>
            )}
          </select>
        </div>
        <button type="submit">Update Hotel</button>
      </form>
    </div>
  );
};

export default UpdateHotel;
