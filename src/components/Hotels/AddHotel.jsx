import axios from "axios";
import { useEffect, useState } from "react";
import './hotel.css';

const AddHotel = () => {
    const [offers, setOffers] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [stars, setStars] = useState("");
    const [pricePerNight, setpricePerNight] = useState("");
    const [offerId, setOfferId] = useState(null);

    useEffect(() => {
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

        fetchOffers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hotel = { name, location, stars, pricePerNight, offer: { id: offerId } };

        try {
            await axios.post("http://localhost:8080/api/hotels", hotel, {
                withCredentials: true,
            });
            alert("Hotel added successfully!");
            setName("");
            setLocation("");
            setStars("");
            setpricePerNight("");
        } catch (err) {
            console.error("Error adding hotel:", err);
            alert("Error adding hotel.");
        }
    };

    return (
        <div>
            <h2>Add Hotel</h2>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setpricePerNight(e.target.value)}
                    required
                />
                <select onChange={(e) => setOfferId(e.target.value)} value={offerId} required>
                    <option value="" disabled>-- Select an Offer --</option>
                    {offers.map((offer) => (
                        <option key={offer.id} value={offer.id}>{offer.offerDetails}</option>
                    ))}
                </select>
                <button type="submit">Add Hotel</button>
            </form>
        </div>
    );
};

export default AddHotel;
