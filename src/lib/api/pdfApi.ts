import axios from 'axios';

export const pdfApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

pdfApi.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

pdfApi.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error (PDF):', error);
        return Promise.reject(error);
    }
);