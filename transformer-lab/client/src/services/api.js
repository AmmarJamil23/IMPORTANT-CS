import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//Health check

export const checkHealth = async () => {
    const response = await api.get('/health');
    return response.data;
};

export const calculateAttention = async (tokens) => {
    const response = await api.post('/calculate-attention', { tokens });
    return response.data;
}

export default api;