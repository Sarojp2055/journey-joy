import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import heritageBg from '../assets/heritage_login_bg.png';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        try {
            await register(username, password, securityQuestion, securityAnswer);
            setUsername('');
            setPassword('');
            setSecurityAnswer('');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
            setPassword('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-poppins">
            {/* Visual Side - Order 2 on desktop to flip sides compared to login */}
            <div className="hidden lg:flex w-1/2 relative bg-stone-900 justify-center items-center overflow-hidden order-last">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-10000 hover:scale-105"
                    style={{ backgroundImage: `url(${heritageBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                <div className="relative z-10 text-white max-w-lg p-12 text-center animate-fade-in-up">
                    <h1 className="text-5xl font-bold mb-6 font-display tracking-wide">Join the Journey</h1>
                    <p className="text-xl text-stone-200 leading-relaxed font-light">
                        "Create your personal guide to the hidden gems of Kathmandu. Your adventure begins with a single step."
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-stone-50">
                <div className="w-full max-w-lg bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-white/50 animate-fade-in">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-stone-800 mb-2">Create Account</h2>
                        <p className="text-stone-500">Sign up to start exploring.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-shake">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-semibold text-stone-600">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all shadow-sm"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-semibold text-stone-600">Password (8+ chars)</label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all shadow-sm"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100">
                            <p className="text-xs text-stone-400 mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
                                <span className="bg-stone-200 h-px flex-1"></span>
                                Security Recovery
                                <span className="bg-stone-200 h-px flex-1"></span>
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-stone-600">Security Question</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. What is your pet's name?"
                                        className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all shadow-sm"
                                        value={securityQuestion}
                                        onChange={(e) => setSecurityQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-stone-600">Answer</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your answer"
                                        className="w-full px-5 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all shadow-sm"
                                        value={securityAnswer}
                                        onChange={(e) => setSecurityAnswer(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-2 bg-heritage-red text-white text-lg font-bold rounded-xl shadow-lg hover:bg-red-800 hover:shadow-red-900/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-stone-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-heritage-red hover:text-red-800 hover:underline transition-all">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
