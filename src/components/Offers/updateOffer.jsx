import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateOffer = () => {
    const [destinations, setDestinations] = useState([]);
    const [destinationId, setDestinationId] = useState("");
    const [offerDetails, setOfferDetails] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const { offerId } = useParams();

    useEffect(() => {
        const fetchOfferDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/offer/${offerId}`, {
                    withCredentials: true,
                });
                const offer = response.data;
                console.log(offer);
                console.log(offer.destination)
                console.log("''''''''''''''''''''''''"+offer.destinationId)
                setDestinationId(offer.destinationId);
                setOfferDetails(offer.offerDetails);
                setOfferPrice(offer.offerPrice);
                
                // Fetch the destination related to this offer
                const destResponse = await axios.get(`http://localhost:8080/admin/destination/${offer.destinationId}`, {
                    withCredentials: true,
                });
                setDestinations([destResponse.data]);
            } catch (error) {
                console.error("Error fetching offer details:", error);
            }
        };

        fetchOfferDetails();
    }, [offerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedOffer = {
            destination: {
                id: parseInt(destinationId, 10)
            },
            offerDetails,
            offerPrice: parseFloat(offerPrice)
        };

        try {
            const response = await axios.put(`http://localhost:8080/admin/offer/${offerId}`, updatedOffer, {
                withCredentials: true,
            });
            console.log("Offer updated successfully:", response.data);
            alert("Offer updated successfully!");
        } catch (err) {
            console.error("Error updating offer:", err);
            alert("Error updating offer. Please try again.");
        }
    };

    return (
        <div>
            <h2>Update Offer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <select
                        value={destinationId}
                        onChange={(e) => setDestinationId(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select a Destination --
                        </option>
                        {destinations.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                                {dest.name} - {dest.country}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Offer Details"
                        value={offerDetails}
                        onChange={(e) => setOfferDetails(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Offer Price"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Offer</button>
            </form>
        </div>
    );
};

export default UpdateOffer;