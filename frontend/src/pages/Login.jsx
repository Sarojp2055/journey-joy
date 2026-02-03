import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import heritageBg from '../assets/heritage_login_bg.png'; // Assuming the generated image is saved here

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            setUsername('');
            setPassword('');
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
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 relative bg-stone-900 justify-center items-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-10000 hover:scale-105"
                    style={{ backgroundImage: `url(${heritageBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                
                <div className="relative z-10 text-white max-w-lg p-12 text-center animate-fade-in-up">
                    <h1 className="text-5xl font-bold mb-6 font-display tracking-wide">Journey Joy</h1>
                    <p className="text-xl text-stone-200 leading-relaxed font-light">
                        "Discover the timeless echo of Kathmandu's heritage. Every trail tells a story, every stone holds a memory."
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-stone-50">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 animate-fade-in">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-stone-800 mb-2">Welcome Back</h2>
                        <p className="text-stone-500">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-shake">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-stone-600">Username</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all duration-300 shadow-sm group-hover:bg-white"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-stone-600">Password</label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-xs font-semibold text-heritage-red hover:text-red-800 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <input
                                    type="password"
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red transition-all duration-300 shadow-sm group-hover:bg-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-heritage-red text-white text-lg font-bold rounded-xl shadow-lg hover:bg-red-800 hover:shadow-red-900/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-stone-100 text-center">
                        <p className="text-stone-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-heritage-red hover:text-red-800 hover:underline transition-all">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
