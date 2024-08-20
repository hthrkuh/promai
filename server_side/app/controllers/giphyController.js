const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const getTrendingGIFs = async (req, res) => {
    try {
        const cachedData = cache.get("trendingGIFs");
        if (cachedData) {
            return res.json(cachedData);
        }

        const { data } = await axios.get(
            `https://api.giphy.com/v1/gifs/trending`,
            {
                params: { api_key: process.env.GIPHY_API_KEY, limit: 10 }
            }
        );

        cache.set("trendingGIFs", data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending GIFs" });
    }
};

const searchGIFs = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term is required" });
        }

        const { data } = await axios.get(
            `https://api.giphy.com/v1/gifs/search`,
            {
                params: {
                    api_key: process.env.GIPHY_API_KEY,
                    q: searchTerm,
                    limit: 10
                }
            }
        );

        res.status(200).json(data);
    } catch (error) {
        console.error("Error searching GIFs:", error.message);
        res.status(500).json({
            error: "An error occurred while searching for GIFs"
        });
    }
};

module.exports = { getTrendingGIFs, searchGIFs };
