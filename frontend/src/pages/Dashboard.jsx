import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [visited, setVisited] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        api.get('/me/visits').then(setVisited).catch(console.error);
        api.get('/me/favorites').then(setFavorites).catch(console.error);
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to homepage
    };

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-stone-800">Namaste, {user.username} 🙏</h1>
                <button
                    onClick={handleLogout}
                    className="bg-stone-100 text-stone-600 px-4 py-2 rounded-lg hover:bg-heritage-red hover:text-white transition-all font-semibold shadow-sm"
                >
                    Logout
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Visited Section */}
                <div>
                    <h2 className="text-2xl font-bold text-heritage-red mb-6 border-b pb-2">My Pilgrimage ({visited.length})</h2>
                    {visited.length === 0 ? (
                        <p className="text-stone-500">You haven't visited any places yet. <Link to="/explore" className="text-heritage-red underline">Start exploring!</Link></p>
                    ) : (
                        <div className="space-y-4">
                            {visited.map(place => (
                                <Link to={`/places/${place.slug}`} key={place.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <img src={place.image_url} alt={place.name} className="w-24 h-24 object-cover rounded-md" />
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-800">{place.name}</h4>
                                        <p className="text-sm text-stone-500 flex items-center gap-1">
                                            <MapPin size={14} /> {place.city_name}
                                        </p>
                                        <p className="text-xs text-green-600 mt-2 font-medium">
                                            Visited on {new Date(place.visited_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Favorites Section */}
                <div>
                    <h2 className="text-2xl font-bold text-heritage-gold mb-6 border-b pb-2">My Wishlist</h2>
                    {favorites.length === 0 ? (
                        <p className="text-stone-500">No favorites yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {favorites.map(place => (
                                <Link to={`/places/${place.slug}`} key={place.id} className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-heritage-gold">
                                    <h4 className="font-bold text-lg text-stone-800">{place.name}</h4>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
