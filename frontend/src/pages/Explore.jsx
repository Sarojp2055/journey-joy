import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

export default function Explore() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [filters, setFilters] = useState({ city: '', category: '', search: '' });

    useEffect(() => {
        api.get('/places').then(setPlaces).catch(console.error);
    }, []);

    useEffect(() => {
        let result = places;
        if (filters.city) result = result.filter(p => p.city_name === filters.city);
        if (filters.category) result = result.filter(p => p.category_name === filters.category);
        if (filters.search) result = result.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
        setFilteredPlaces(result);
    }, [places, filters]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8 space-y-4">
                <h1 className="text-4xl font-serif font-bold text-stone-800">Explore Heritage Sites</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search temples, stupas..."
                            className="pl-10 pr-4 py-2 w-full rounded-md border focus:ring-2 focus:ring-heritage-red outline-none"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <select
                        className="px-4 py-2 rounded-md border focus:ring-2 focus:ring-heritage-red outline-none bg-white"
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    >
                        <option value="">All Cities</option>
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Lalitpur">Lalitpur</option>
                        <option value="Bhaktapur">Bhaktapur</option>
                    </select>
                    <select
                        className="px-4 py-2 rounded-md border focus:ring-2 focus:ring-heritage-red outline-none bg-white"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Temple">Temple</option>
                        <option value="Stupa">Stupa</option>
                        <option value="Durbar Square">Durbar Square</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map(place => (
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
                ))}
            </div>
        </div>
    );
}
