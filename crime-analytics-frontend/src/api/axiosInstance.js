import axios from 'axios';
import toast from 'react-hot-toast';

const APPSAIL_URL = 'https://crime-analytics-backend-50044348096.development.catalystappsail.in/api';
const isProduction = typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname);

const axiosInstance = axios.create({
  baseURL: isProduction ? APPSAIL_URL : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crime_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Toast & 401 Handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    
    if (status === 401) {
      if (localStorage.getItem('crime_jwt_token')) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('crime_jwt_token');
        localStorage.removeItem('crime_user');
        if (window.location.hash) {
          window.location.hash = '#/login';
        } else {
          window.location.href = '/login';
        }
      } else {
        const msg = typeof error.response?.data === 'string'
          ? error.response.data
          : error.response?.data?.message || 'Invalid email or password';
        toast.error(msg);
      }
    } else if (status === 403) {
      toast.error('Access Denied: You do not have permission for this action.');
    } else if (error.response && error.response.data) {
      const msg = typeof error.response.data === 'string' 
        ? error.response.data 
        : error.response.data.message || 'An error occurred';
      toast.error(msg);
    } else if (error.message) {
      toast.error(error.message);
    }


    return Promise.reject(error);
  }
);

export default axiosInstance;
