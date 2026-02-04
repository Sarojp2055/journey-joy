import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { User, Heart, MapPin, LogOut, Star, TrendingUp, Map } from 'lucide-react';

const COLORS = ['#B91C1C', '#D4AF37', '#44403C', '#059669', '#0891B2', '#7C3AED'];

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout, loading: authLoading } = useAuth();
    const [stats, setStats] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [visits, setVisits] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }

        if (user) {
            fetchData();
        }
    }, [user, authLoading, navigate]);

    const fetchData = async () => {
        try {
            const [statsData, favoritesData, visitsData] = await Promise.all([
                api.get('/me/stats'),
                api.get('/me/favorites'),
                api.get('/me/visits')
            ]);
            setStats(statsData);
            setFavorites(favoritesData);
            setVisits(visitsData);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="text-4xl">☸️</motion.div>
            </div>
        );
    }

    if (!user) return null;

    const pieData = stats?.cities?.map(city => ({
        name: city.city,
        value: city.visited,
        total: city.total
    })) || [];

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-heritage-gold rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-heritage-red rounded-full blur-3xl" />
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-heritage-red to-heritage-gold flex items-center justify-center text-4xl md:text-5xl font-bold">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left flex-grow">
                            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">{user.username}</h1>
                            <p className="text-stone-400 mb-4">{user.email}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-heritage-gold font-bold">{stats?.overall?.favorites || 0}</span>
                                    <span className="text-stone-300 ml-2 text-sm">Favorites</span>
                                </div>
                                <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-heritage-gold font-bold">{stats?.overall?.visitedPlaces || 0}</span>
                                    <span className="text-stone-300 ml-2 text-sm">Visited</span>
                                </div>
                                <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <span className="text-heritage-gold font-bold">{stats?.overall?.percentage || 0}%</span>
                                    <span className="text-stone-300 ml-2 text-sm">Explored</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {[
                        { id: 'overview', label: 'Overview', icon: TrendingUp },
                        { id: 'favorites', label: 'Favorites', icon: Heart },
                        { id: 'visits', label: 'Visited', icon: MapPin }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-heritage-red text-white shadow-lg'
                                    : 'bg-white text-stone-600 hover:bg-stone-100'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <Map className="text-heritage-red" size={24} />
                                Exploration Progress
                            </h2>

                            {pieData.length > 0 && pieData.some(d => d.value > 0) ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value, total }) => `${name}: ${value}/${total}`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-[300px] flex items-center justify-center text-stone-400">
                                    <div className="text-center">
                                        <Map size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>Start exploring to see your progress!</p>
                                        <Link to="/explore" className="text-heritage-red font-semibold hover:underline mt-2 inline-block">
                                            Explore Now
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* City Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <Star className="text-heritage-gold" size={24} />
                                City Progress
                            </h2>

                            <div className="space-y-6">
                                {stats?.cities?.map((city, index) => (
                                    <div key={city.city}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold text-stone-700">{city.city}</span>
                                            <span className="text-stone-500 text-sm">{city.visited}/{city.total} places</span>
                                        </div>
                                        <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${city.percentage}%` }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                        </div>
                                        <div className="text-right text-sm text-stone-400 mt-1">{city.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.length > 0 ? favorites.map(place => (
                            <Link
                                to={`/places/${place.slug}`}
                                key={place.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={place.image_url}
                                        alt={place.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Heart className="text-heritage-red fill-heritage-red" size={24} />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-stone-800 group-hover:text-heritage-red transition-colors">{place.name}</h3>
                                    <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
                                        <MapPin size={14} /> {place.city_name}
                                    </p>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full text-center py-16 bg-white rounded-2xl">
                                <Heart size={48} className="mx-auto mb-4 text-stone-300" />
                                <p className="text-stone-500">No favorites yet</p>
                                <Link to="/explore" className="text-heritage-red font-semibold hover:underline mt-2 inline-block">
                                    Explore and add favorites
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'visits' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visits.length > 0 ? visits.map(place => (
                            <Link
                                to={`/places/${place.slug}`}
                                key={place.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={place.image_url}
                                        alt={place.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        ✓ Visited
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-stone-800 group-hover:text-heritage-red transition-colors">{place.name}</h3>
                                    <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
                                        <MapPin size={14} /> {place.city_name}
                                    </p>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full text-center py-16 bg-white rounded-2xl">
                                <MapPin size={48} className="mx-auto mb-4 text-stone-300" />
                                <p className="text-stone-500">No visited places yet</p>
                                <Link to="/explore" className="text-heritage-red font-semibold hover:underline mt-2 inline-block">
                                    Start your journey
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
