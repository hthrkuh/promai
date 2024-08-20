import React, { useState, useEffect, useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./style/TrendingGIFs.css"; // Import the CSS file
import axiosInstance from "../services/httpService";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function TrendingGIFs() {
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch trending GIFs initially
    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(process.env.REACT_APP_API_URL + "/api/giphy/trending")
            .then((response) => {
                setGifs(response.data.data);
            })
            .catch((error) =>
                console.error("Error fetching trending GIFs:", error)
            )
            .finally(() => setLoading(false));
    }, []);

    // Memoized search term change handler
    const handleSearchTermChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    // Callback to fetch GIFs based on search term
    const handleSearch = useCallback(() => {
        setLoading(true);
        const url = searchTerm.trim()
            ? `${process.env.REACT_APP_API_URL}/api/giphy/search?q=${searchTerm}`
            : `${process.env.REACT_APP_API_URL}/api/giphy/trending`;

        axiosInstance
            .get(url)
            .then((response) => {
                setGifs(response.data.data);
            })
            .catch((error) => console.error("Error searching GIFs:", error))
            .finally(() => setLoading(false));
    }, [searchTerm]);

    // Callback to handle buying a GIF
    const handleBuy = useCallback(async (gif) => {
        const stripe = await stripePromise;
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                process.env.REACT_APP_API_URL + "/api/payment/pay",
                { gif }
            );
            const session = response.data;
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Memoize GIF card elements
    const gifCards = useMemo(
        () =>
            gifs.map((gif) => (
                <div key={gif.id} className="gif-card">
                    <img src={gif?.images.fixed_height?.url} alt={gif.title} />
                    <button onClick={() => handleBuy(gif)}>Buy now - $5</button>
                </div>
            )),
        [gifs, handleBuy]
    );

    return (
        <div className="store-container">
            <h2>Trending GIFs Store</h2>
            <div style={{ margin: 35 }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Search GIFs"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="gif-list">
                    {gifs.length ? gifCards : <span>Gifs not found</span>}
                </div>
            )}
        </div>
    );
}

export default TrendingGIFs;
