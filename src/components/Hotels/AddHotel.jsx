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
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const base64Image = previewUrl;
            
            const hotel = { 
                name, 
                location, 
                stars, 
                pricePerNight, 
                offer: { id: offerId },
                imageUrl: base64Image 
            };

            await axios.post("http://localhost:8080/api/hotels", hotel, {
                withCredentials: true,
            });
            alert("Hotel added successfully!");
            setName("");
            setLocation("");
            setStars("");
            setpricePerNight("");
            setImage(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error("Error adding hotel:", err);
            alert("Error adding hotel.");
        }
    };

    return (
        <div>
            <h2>Add Hotel</h2>
            <form className="AddForm" onSubmit={handleSubmit}>
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
                        <option key={offer.id} value={offer.id}>{offer.id}--{offer.offerDetails}</option>
                    ))}
                </select>
                <div className="image-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {previewUrl && (
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            style={{ maxWidth: '200px', marginTop: '10px' }} 
                        />
                    )}
                </div>
                <button type="submit">Add Hotel</button>
            </form>
        </div>
    );
};

export default AddHotel;