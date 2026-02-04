import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { MapPin } from 'lucide-react';

export default function Home() {
    const [famousPlaces, setFamousPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch famous places for the homepage
        api.get('/places/famous')
            .then(setFamousPlaces)
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="relative h-[85vh] bg-stone-900 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 scale-105 animate-slow-zoom"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50" />

                <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-4 text-heritage-gold">Your Ultimate Travel Companion</h2>
                        <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight drop-shadow-lg text-white">
                            Journey Joy
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-stone-200 mb-12 max-w-2xl font-light leading-relaxed"
                    >
                        Immerse yourself in the sacred history of the Kathmandu Valley. Walk the paths of ancients, visit living temples, and discover your spiritual journey.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4"
                    >
                        <Link
                            to="/explore"
                            className="bg-heritage-red text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-800 transition-all shadow-lg hover:shadow-heritage-red/50"
                        >
                            Explore
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Famous Places Section */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-heritage-red font-bold tracking-widest uppercase text-sm">Discover</span>
                    <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">Famous Places to Visit</h2>
                    <div className="w-24 h-1 bg-heritage-gold mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {famousPlaces.length > 0 ? famousPlaces.map((place) => (
                        <Link to={`/places/${place.slug}`} key={place.id} className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={place.image_url}
                                    alt={place.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="flex items-center text-sm font-medium mb-1"><MapPin size={14} className="mr-1 text-heritage-gold" /> {place.city_name}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2 group-hover:text-heritage-red transition-colors">{place.name}</h3>
                                <p className="text-stone-500 text-sm line-clamp-2">{place.description}</p>
                            </div>
                        </Link>
                    )) : error ? (
                        <div className="col-span-3 text-center bg-red-50 p-8 rounded-xl border border-red-200">
                            <p className="text-red-600 font-bold mb-2">⚠ Unable to load places</p>
                            <p className="text-stone-600 text-sm">{error}</p>
                        </div>
                    ) : (
                        <p className="text-center col-span-3 text-gray-500 italic">Unearthing the sacred valley...</p>
                    )}
                </div>
            </section>

            {/* Footer or Call to Action removed 'Most Visited' section as requested */}
        </div>
    );
}
