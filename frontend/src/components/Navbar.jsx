import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-heritage-red text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <span className="font-bold text-xl tracking-wider text-heritage-gold font-serif text-white">
                                JOURNEY JOY
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/explore" className="hover:text-heritage-gold transition-colors font-medium">Explore</Link>
                        {user ? (
                            <div className="flex items-center gap-4 ml-4">
                                <span className="text-heritage-gold flex items-center gap-2 font-medium">
                                    <User size={18} />
                                    {user.username}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 ml-4">
                                <Link to="/login" className="text-white hover:text-heritage-gold font-medium px-4 py-2">Login</Link>
                                <Link to="/register" className="bg-heritage-gold text-stone-900 hover:bg-yellow-500 px-5 py-2 rounded-full font-bold shadow-md transition-all transform hover:scale-105">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-heritage-gold">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-heritage-red border-t border-red-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/explore"
                            className="block px-3 py-2 rounded-md hover:bg-red-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Explore
                        </Link>
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md hover:bg-red-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md hover:bg-red-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && (
                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left block px-3 py-2 rounded-md hover:bg-red-800 text-heritage-gold"
                            >
                                Logout ({user.username})
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
