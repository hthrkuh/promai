import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL // Set the base URL for your API
});

// Add a request interceptor to include the auth token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(null, (error) => {
    toast.error(error.message);
    if (!error.response?.data.Message) toast.error(error.response?.data);
    else toast.error(error.response?.data.Message);
    return Promise.reject(error);
});

export default axiosInstance;
