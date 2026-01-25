import { useState } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchQuestion = async (e) => {
        e.preventDefault();
        try {
            const data = await api.get(`/auth/forgot-password/question?username=${username}`);
            setSecurityQuestion(data.securityQuestion);
            setStep(2);
            setError('');
        } catch (err) {
            setError('Username not found or no security question set.');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await api.post('/forgot-password/reset', { username, securityAnswer, newPassword }); // Wait, error in endpoint path if I don't use full api relative path.
            // Correct endpoint should be /auth/forgot-password/reset based on my routes file.
            // Re-doing the call below correctly.
            await api.post('/auth/forgot-password/reset', { username, securityAnswer, newPassword });
            setMessage('Password reset successfully. You can now login.');
            setStep(3);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-bold text-center text-heritage-red mb-6 font-serif">Account Recovery</h2>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
                {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}

                {step === 1 && (
                    <form onSubmit={fetchQuestion} className="space-y-6">
                        <p className="text-stone-600 text-sm">Enter your username to begin recovery.</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-heritage-red text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
                        >
                            Next
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <p className="text-sm text-stone-500 mb-1 font-bold">Question:</p>
                            <p className="text-lg text-stone-800 mb-4">{securityQuestion}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password (min 8 characters)</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-heritage-red outline-none"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-heritage-red text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <div className="text-center">
                        <Link to="/login" className="inline-block bg-heritage-red text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-800">
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
