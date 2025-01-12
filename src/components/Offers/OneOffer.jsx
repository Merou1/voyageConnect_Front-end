import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OneOffer = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/admin/offer/${id}`, {
                    withCredentials: true,
                });
                setOffer(result.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching offer details:", err);
                setLoading(false);
            }
        };

        fetchOffer();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!offer) return <p>No details found for this offer.</p>;

    return (
        <div >
            <h2>Offer Details</h2>
            <h3 style={{color:"black"}}><strong>ID:</strong> {offer.id}</h3>
            <h3 style={{color:"black"}}><strong>Description:</strong> {offer.offerDetails}</h3>
            <h3 style={{color:"black"}}><strong>Offer Price:</strong> {offer.offerPrice} <strong>Dh</strong></h3>
        </div>
    );
};

export default OneOffer;
