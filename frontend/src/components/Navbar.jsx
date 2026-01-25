import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
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
                        <Link to="/" className="hover:text-heritage-gold transition-colors font-medium">Home</Link>
                        <Link to="/explore" className="hover:text-heritage-gold transition-colors font-medium">Explore</Link>
                        {user ? (
                            <Link to="/dashboard" className="flex items-center gap-2 hover:text-heritage-gold font-medium">
                                <User size={18} />
                                {user.username}
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-heritage-gold text-heritage-red px-5 py-2 rounded-full font-bold hover:bg-white transition-all shadow-md"
                            >
                                Login
                            </Link>
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
                            to="/"
                            className="block px-3 py-2 rounded-md hover:bg-red-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/explore"
                            className="block px-3 py-2 rounded-md hover:bg-red-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Explore
                        </Link>
                        <Link
                            to={user ? "/dashboard" : "/login"}
                            className="block px-3 py-2 rounded-md hover:bg-red-800 text-heritage-gold font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {user ? "My Dashboard" : "Login"}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
