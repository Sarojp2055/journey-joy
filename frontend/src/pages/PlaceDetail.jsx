import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { MapPin, Heart, CheckCircle, ExternalLink, MessageCircle, Star } from 'lucide-react';
import SacredIcon from '../components/SacredIcon';
import { motion } from 'framer-motion';

export default function PlaceDetail() {
    const { slug } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Interaction states
    const [isVisited, setIsVisited] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.get(`/places/${slug}`);
                console.log('🏛️ Journey Joy | Data Loaded:', data);
                setPlace(data);

                if (user) {
                    try {
                        const visits = await api.get('/me/visits');
                        const favorites = await api.get('/me/favorites');
                        setIsVisited(visits.some(v => v.id === data.id));
                        setIsFavorite(favorites.some(f => f.id === data.id));
                    } catch (e) { console.error('Error fetching user stats:', e); }
                }
            } catch (err) {
                console.error('Error fetching place:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug, user]);

    const toggleVisit = async () => {
        if (!user) return alert('Please login first');
        try {
            if (isVisited) {
                await api.delete(`/places/${place.id}/visit`);
                setIsVisited(false);
            } else {
                await api.post(`/places/${place.id}/visit`);
                setIsVisited(true);
            }
        } catch (e) { alert(e.message); }
    };

    const toggleFavorite = async () => {
        if (!user) return alert('Please login first');
        try {
            if (isFavorite) {
                await api.delete(`/places/${place.id}/favorite`);
                setIsFavorite(false);
            } else {
                await api.post(`/places/${place.id}/favorite`);
                setIsFavorite(true);
            }
        } catch (e) { alert(e.message); }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="text-4xl">☸️</motion.div>
        </div>
    );
    if (!place) return <div className="p-10 text-center">Sacred knowledge not found at this location.</div>;

    return (
        <div className="bg-stone-50 min-h-screen">
            {/* Hero Section - Redesigned for Image-Left, Name-Right Alignment */}
            <div className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <img src={place.image_url} alt="" className="w-full h-full object-cover blur-sm brightness-[0.3]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-heritage-red/10 to-stone-950" />
                </div>

                <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-end gap-12">
                        {/* Heritage Image (Top Left Focus) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full max-w-[450px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-8 border-white group"
                        >
                            <img src={place.image_url} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                        </motion.div>

                        {/* Heritage Title & Context (Aligned Right of Image) */}
                        <div className="flex-grow text-center lg:text-left pb-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-heritage-gold/20 backdrop-blur-md rounded-full border border-heritage-gold/30 text-heritage-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">
                                    <MapPin size={14} />
                                    {place.city_name} • {place.category_name}
                                </div>
                                <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] drop-shadow-2xl">
                                    {place.name}
                                </h1>
                                {place.quote && (
                                    <p className="text-xl md:text-2xl text-stone-300 italic max-w-2xl font-serif border-l-4 border-heritage-red pl-6 py-2 leading-relaxed">
                                        "{place.quote}"
                                    </p>
                                )}
                            </motion.div>

                            {/* Floating Sacred Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="mt-10 inline-block p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-xl"
                            >
                                <SacredIcon type={place.category_name} name={place.name} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-grow bg-stone-200"></div>
                            <h2 className="text-3xl font-bold text-stone-800 font-serif whitespace-nowrap">Sacred Narrative</h2>
                            <div className="h-px flex-grow bg-stone-200"></div>
                        </div>
                        <p className="text-xl text-stone-600 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-heritage-red first-letter:leading-none">
                            {place.description}
                        </p>
                    </section>

                    {place.beliefs_text && (
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl overflow-hidden"
                        >
                            <h3 className="text-2xl font-bold text-heritage-red mb-6 flex items-center gap-3 font-serif">
                                🔱 Divine Legends
                            </h3>
                            <p className="text-stone-700 leading-relaxed text-lg italic relative z-10 font-serif">
                                "{place.beliefs_text}"
                            </p>
                        </motion.section>
                    )}

                    <div className="flex flex-wrap gap-6 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            onClick={toggleVisit}
                            className={`flex items-center gap-4 px-10 py-5 rounded-full font-bold transition-all ${isVisited ? 'bg-green-600 text-white shadow-green-200' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                                }`}
                        >
                            <CheckCircle size={24} />
                            {isVisited ? 'Visited Site' : 'Mark Arrival'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            onClick={toggleFavorite}
                            className={`flex items-center gap-4 px-10 py-5 rounded-full font-bold transition-all ${isFavorite ? 'bg-red-600 text-white shadow-red-200' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                                }`}
                        >
                            <Heart size={24} fill={isFavorite ? 'white' : 'none'} />
                            {isFavorite ? 'In Wishlist' : 'Add to Wishlist'}
                        </motion.button>
                    </div>

                    {place.video_url && (
                        <section className="mt-20 pt-10 border-t border-stone-200">
                            <h3 className="text-2xl font-bold text-stone-800 mb-8 font-serif flex items-center gap-2">
                                🎥 Journey Joy Vision: {place.name}
                            </h3>
                            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src={place.video_url}
                                    title={`${place.name} Video Preview`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="mt-4 text-center text-stone-400 text-sm italic font-medium">✨ Immerse yourself in the sacred atmosphere</p>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-stone-100 sticky top-24">
                        <div className="flex items-center justify-around py-6 bg-stone-50 rounded-2xl border border-stone-100 mb-8 shadow-inner">
                            <div className="text-center">
                                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Travelers</p>
                                <p className="text-2xl font-bold text-heritage-red">1.2k+</p>
                            </div>
                            <div className="w-px h-10 bg-stone-200"></div>
                            <div className="text-center">
                                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Aura</p>
                                <p className="text-2xl font-bold text-heritage-gold">Divine</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 w-full p-4 rounded-2xl bg-stone-50 text-stone-700 hover:bg-blue-50 hover:text-blue-700 transition-all border border-stone-100 font-semibold group"
                            >
                                <div className="p-2 bg-white rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <MapPin size={20} className="text-heritage-red" />
                                </div>
                                Navigate Site
                            </a>

                            <a
                                href={`https://wa.me/9779800000000?text=Namaste! I am exploring ${place.name} with Journey Joy. I need a guide.`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 w-full p-4 rounded-2xl bg-green-50 text-green-800 hover:bg-green-100 transition-all border border-green-200 font-bold group"
                            >
                                <div className="p-2 bg-white rounded-lg group-hover:bg-green-200 transition-colors">
                                    <MessageCircle size={20} className="text-green-600" />
                                </div>
                                WhatsApp Assistant
                            </a>
                        </div>

                        <div>
                            <h3 className="font-bold text-stone-800 mb-6 text-sm uppercase tracking-[0.2em] flex items-center gap-2 border-b border-stone-100 pb-3">
                                <Star size={16} className="text-heritage-gold fill-heritage-gold" />
                                Curated Stays Nearby
                            </h3>

                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {place.hotels && place.hotels.length > 0 ? (
                                    place.hotels.map(hotel => (
                                        <motion.div
                                            key={hotel.id}
                                            whileHover={{ x: 5 }}
                                            className="p-4 border rounded-2xl hover:border-heritage-gold transition-all bg-white shadow-sm border-stone-100"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-sm text-stone-800 leading-tight pr-2">{hotel.name}</h4>
                                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                                    <span className="text-[10px] font-black text-yellow-700">★ {hotel.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-stone-400 mb-3 flex items-center gap-1 font-medium">
                                                📞 {hotel.contact_number}
                                            </p>
                                            <a
                                                href={hotel.map_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[10px] text-heritage-red font-bold uppercase tracking-widest hover:text-stone-900 transition-colors flex items-center gap-2"
                                            >
                                                Show Details <ExternalLink size={10} />
                                            </a>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
                                        <p className="text-sm text-stone-400 italic">No hardcoded stays in {place.city_name} yet.</p>
                                        <div className="mt-4">
                                            <a
                                                href={`https://www.google.com/maps/search/hotels+near+${place.lat},${place.lng}`}
                                                target="_blank" rel="noreferrer"
                                                className="text-xs text-heritage-red font-bold hover:underline"
                                            >
                                                Search on Google Maps
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
