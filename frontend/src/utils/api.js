const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = isLocal ? 'http://localhost:5000/api' : '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    get: async (endpoint) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    post: async (endpoint, body) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: res.statusText }));
            throw new Error(errorData.error || 'Something went wrong');
        }
        return res.json();
    },

    delete: async (endpoint) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
