import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: (params) => queryString.stringify(params),
    timeout: 20000
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
    const customHeaders = {};
    const accessToken = Cookies.get('token') ;
    const token = accessToken || localStorage.getItem('token');
    
    if (token) {
        customHeaders.Authorization = `Bearer ${token}`;
    }

    return {
        ...config,
        headers: {
            ...customHeaders, // auto attach token
            ...config.headers // but you can override for some requests
        }
    };
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token is not valid or has expired, refresh the window
            window.href = '/';
            localStorage.removeItem('user');
            Cookies.remove('access_token');
        }
        
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;