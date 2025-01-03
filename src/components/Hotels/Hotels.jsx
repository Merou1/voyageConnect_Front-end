import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './hotel.css';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [offerDetails, setOfferDetails] = useState({}); 

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/hotels", {
                    withCredentials: true,
                });
                const data = result.data;
                setHotels(data);
                console.log("hotels : "+data)

                const offerDescriptions = {};
                for (const hotel of data) {
                    if (hotel.offerId) {
                        offerDescriptions[hotel.offerId] = "Loading...";
                        fetchOfferDescription(hotel.offerId, offerDescriptions);
                    }
                }
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        };

        const fetchOfferDescription = async (offerId, offerDescriptions) => {
            try {
                const result = await axios.get(`http://localhost:8080/admin/offer/${offerId}`, {
                    withCredentials: true,
                });
                offerDescriptions[offerId] = result.data.offerDetails;
                setOfferDetails({ ...offerDescriptions });
            } catch (err) {
                console.error(`Error fetching offer for ID ${offerId}:`, err);
                offerDescriptions[offerId] = "Error fetching data";
                setOfferDetails({ ...offerDescriptions });
            }
        };

        fetchHotels();
    }, []);

    const handleHotelDelete = async (id) => {
        try {
            const confirmation = window.confirm("Are you sure you want to delete this hotel?");
            if (!confirmation) return;

            await axios.delete(`http://localhost:8080/api/hotels/${id}`, {
                withCredentials: true,
            });
            setHotels(hotels.filter(hotel => hotel.id !== id));
            alert("Hotel deleted successfully!");
        } catch (err) {
            console.error("Error deleting hotel:", err);    
            alert("Error deleting hotel.");
        }
    };

    return (
        <div className="HotelsList">
            <div>
                <Link to="/hotels/add"><h3>Add Hotel</h3></Link>
            </div>
            <h2>Hotels List</h2>
            {
                hotels.length === 0
                    ? <p>Loading...</p>
                    : <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Rating</th>
                                <th>Offer</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel, index) => (
                                <tr key={index}>
                                    <td>{hotel.name}</td>
                                    <td>{hotel.location}</td>
                                    <td>{hotel.stars}</td>
                                    <td>
                                        <Link to={`/offers/${hotel.offerId}`}>
                                        <strong>Offer : {hotel.offerId}</strong>  <br />
                                        </Link>
                                    </td>
                                    <td>{hotel.pricePerNight}</td>
                                    <td className="td">
                                        <Link to={`/hotels/update/${hotel.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                        <button onClick={() => handleHotelDelete(hotel.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default Hotels;
