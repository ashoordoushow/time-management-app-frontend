import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';

const baseURL = isDevelopment 
  ? 'http://localhost:3000'  // Local backend URL for development
  : import.meta.env.VITE_API_URL;  // Backend URL from Railway in production

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default apiClient;
