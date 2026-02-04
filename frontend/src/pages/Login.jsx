import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-heritage-red/30">
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(3px)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent" />
            </div>

            {/* Floating decorative elements */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 text-6xl opacity-20"
            >☸️</motion.div>
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-20 text-6xl opacity-20"
            >🕉</motion.div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
                    {/* Logo / Title */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <h1 className="text-3xl font-bold font-serif text-white mb-2">Journey Joy</h1>
                        </Link>
                        <p className="text-stone-300 text-sm">Welcome back, explorer!</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200"
                        >
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/20 outline-none transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/20 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-heritage-gold hover:text-heritage-gold/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-heritage-red to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-heritage-red/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-grow h-px bg-white/20" />
                        <span className="text-stone-400 text-sm">or continue with</span>
                        <div className="flex-grow h-px bg-white/20" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
                            onClick={() => alert('Google OAuth requires API credentials. Please configure GOOGLE_CLIENT_ID in environment.')}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2]/80 border border-[#1877F2] rounded-xl text-white hover:bg-[#1877F2] transition-all"
                            onClick={() => alert('Facebook OAuth requires API credentials. Please configure FACEBOOK_APP_ID in environment.')}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-stone-300 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-heritage-gold font-semibold hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
