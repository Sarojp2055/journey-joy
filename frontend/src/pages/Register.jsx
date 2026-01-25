import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        try {
            await register(username, password, securityQuestion, securityAnswer);
            // Clear local state
            setUsername('');
            setPassword('');
            setSecurityAnswer('');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
            setPassword('');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-bold text-center text-heritage-red mb-6">Create Account</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red focus:border-transparent outline-none transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password (min 8 characters)</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="pt-2 border-t">
                        <p className="text-xs text-stone-400 mb-3 font-semibold uppercase tracking-wider">Recovery Settings</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Security Question</label>
                            <input
                                type="text"
                                required
                                placeholder="Your favorite childhood book?"
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none text-sm shadow-sm"
                                value={securityQuestion}
                                onChange={(e) => setSecurityQuestion(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secuirty Answer</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none text-sm shadow-sm"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-heritage-red text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-heritage-red font-semibold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
