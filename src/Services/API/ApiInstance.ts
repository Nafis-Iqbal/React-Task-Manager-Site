import axios from 'axios';
import store from '../../GlobalStateContext/GlobalStateStore';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
//const apiBaseURL = 'http://localhost:8000/api'; // Example base URL
//const apiBaseURL = 'https://laravel-task-manager-site-32f673082056.herokuapp.com/api';

// Create Axios instance with default config
const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    //const token = store.getState().auth.token;
    const token = sessionStorage.getItem('auth_token');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, 
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
