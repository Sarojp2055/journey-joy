import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

export default function Explore() {
    const [places, setPlaces] = useState([]);
    const [filters, setFilters] = useState({ city: '', category: '', search: '' });
    const [loading, setLoading] = useState(true);

    // Fetch places whenever filters change (Server-side filtering for better accuracy)
    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                // Construct query string manually for simplicity
                let query = '/places?';
                if (filters.city) query += `city=${encodeURIComponent(filters.city)}&`;
                if (filters.category) query += `category=${encodeURIComponent(filters.category)}&`;
                if (filters.search) query += `q=${encodeURIComponent(filters.search)}&`;

                const data = await api.get(query);
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching filtered places:", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchPlaces();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8 space-y-4">
                <h1 className="text-4xl font-serif font-bold text-stone-800">Explore Heritage Sites</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-grow min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search temples, stupas..."
                            className="pl-10 pr-4 py-2 w-full rounded-md border text-stone-700 focus:ring-2 focus:ring-heritage-red outline-none"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <select
                        className="px-4 py-2 rounded-md border focus:ring-2 focus:ring-heritage-red outline-none bg-white text-stone-700"
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    >
                        <option value="">All Cities</option>
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Lalitpur">Lalitpur</option>
                        <option value="Bhaktapur">Bhaktapur</option>
                    </select>
                    <select
                        className="px-4 py-2 rounded-md border focus:ring-2 focus:ring-heritage-red outline-none bg-white text-stone-700"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Temple">Temple</option>
                        <option value="Stupa">Stupa</option>
                        <option value="Durbar Square">Durbar Square</option>
                        <option value="Monastery">Monastery</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin text-4xl">☸️</div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {places.length > 0 ? places.map(place => (
                        <Link to={`/places/${place.slug}`} key={place.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={place.image_url || 'https://via.placeholder.com/400x300'}
                                    alt={place.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-heritage-red uppercase tracking-wider shadow-sm">
                                    {place.category_name}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center text-stone-500 text-sm mb-2">
                                    <MapPin size={16} className="mr-1" />
                                    {place.city_name}
                                </div>
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-heritage-red transition-colors">{place.name}</h3>
                                <p className="text-stone-600 line-clamp-3 text-sm flex-grow">{place.description}</p>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full py-20 text-center text-stone-500">
                            <p className="text-xl italic">No sacred sites found matching your criteria.</p>
                            <button onClick={() => setFilters({ city: '', category: '', search: '' })} className="mt-4 text-heritage-red font-bold hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
