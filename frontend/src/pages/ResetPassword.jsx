import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/reset-password', { token, password: formData.password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'Failed to reset password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-heritage-red/30">
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent" />
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
                    {/* Back Link */}
                    <Link to="/login" className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft size={18} />
                        Back to login
                    </Link>

                    {/* Logo / Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold font-serif text-white mb-2">Reset Password</h1>
                        <p className="text-stone-300 text-sm">Choose a new, strong password for your account.</p>
                    </div>

                    {success ? (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
                            <p className="text-stone-300 text-sm mb-6">
                                Your password has been successfully reset. Redirecting to login...
                            </p>
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        </motion.div>
                    ) : (
                        /* Form */
                        <>
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

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Password Field */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="New password"
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

                                {/* Confirm Password Field */}
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/20 outline-none transition-all"
                                    />
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={20} />
                                    )}
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
                                        'Reset Password'
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
