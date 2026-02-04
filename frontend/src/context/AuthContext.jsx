import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                // If a token exists in cookies/storage (we use httpOnly cookies usually, but here we might need a way to check login status)
                // Actually, our backend uses jwt in response body, so we likely store it in localStorage for now
                // Or we can rely on verifying with /api/auth/me if we stored token
                const token = localStorage.getItem('token');
                if (token) {
                    // Note: This needs to match how 'api' utility is used
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.token);

        // Fetch user data
        const userRes = await api.get('/auth/me');
        setUser(userRes.data);
    };

    const register = async (username, email, password) => {
        const res = await api.post('/auth/register', { username, email, password });
        localStorage.setItem('token', res.token);

        // Fetch user data
        const userRes = await api.get('/auth/me');
        setUser(userRes.data);
    };

    const googleLogin = async (credential) => {
        const res = await api.post('/auth/google', { token: credential });
        localStorage.setItem('token', res.token);

        // Fetch user data
        const userRes = await api.get('/auth/me');
        setUser(userRes.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        // Optional: navigate to home
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
