import axios from 'axios'
const baseURL = window.location.hostname === 'localhost'
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000, // timeout 5 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance