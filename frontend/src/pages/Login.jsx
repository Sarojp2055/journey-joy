import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            // Clear local state before navigating away
            setUsername('');
            setPassword('');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
            setPassword(''); // Clear password on error
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-bold text-center text-heritage-red mb-6">Welcome Back</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            autoComplete="username"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red focus:border-transparent outline-none transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red focus:border-transparent outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-heritage-red text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/forgot-password" size="sm" className="text-sm text-stone-500 hover:text-heritage-red">Forgot Password?</Link>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-heritage-red font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
