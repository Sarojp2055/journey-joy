import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-stone-700"
            >
                <h2 className="text-3xl font-serif text-heritage-gold mb-6 text-center">Welcome Back</h2>
                {error && <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm border border-red-800">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-stone-400 mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded p-3 text-white focus:border-heritage-gold focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-stone-400 mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded p-3 text-white focus:border-heritage-gold focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-heritage-red text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-stone-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-heritage-gold hover:underline">Register</Link>
                </p>
            </motion.div>
        </div>
    );
}
