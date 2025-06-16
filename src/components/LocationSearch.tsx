import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Clock, ChevronDown } from 'lucide-react';
import { useLocationManager } from '@/hooks/useLocation';
 
interface LocationSearchProps {
  locationName: string;
  locationRegion: string;
  locationCountry: string;
  onSearch: (location: string) => void;
  loading: boolean;
}

const LocationSearch: React.FC< LocationSearchProps> = ({ 
  locationName, 
  locationRegion, 
  locationCountry, 
  onSearch, 
  loading 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const { recentLocations, addRecentLocation } = useLocationManager();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRecentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query.trim());
    }
  };

  const handleSearch = (searchQuery: string) => {
    addRecentLocation({
      name: locationName,
      region: locationRegion,
      country: locationCountry,
      searchQuery
    });
    onSearch(searchQuery);
    setQuery('');
    setIsSearchOpen(false);
    setShowRecentDropdown(false);
  };

  const handleCancel = () => {
    setQuery('');
    setIsSearchOpen(false);
    setShowRecentDropdown(false);
  };

  const handleInputFocus = () => {
    if (recentLocations.length > 0) {
      setShowRecentDropdown(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowRecentDropdown(false);
    } else if (recentLocations.length > 0) {
      setShowRecentDropdown(true);
    }
  };

  const filteredRecentLocations = recentLocations.filter(location =>
    query.length === 0 || 
    location.name.toLowerCase().includes(query.toLowerCase()) ||
    location.searchQuery.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <AnimatePresence mode="wait">
        {!isSearchOpen ? (
          <motion.div
            key="location-display"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:border-white/40"
            >
              <Search className="w-4 h-4 text-white/80" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-1 drop-shadow-lg truncate group-hover:text-white/90 transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                {locationName}
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm drop-shadow-md truncate group-hover:text-white/70 transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                <MapPin className="w-3 h-3 inline mr-1" />
                {locationRegion}, {locationCountry}
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="search-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 pl-12 pr-12 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                disabled={loading}
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              
              {recentLocations.length > 0 && query.length === 0 && (
                <button
                  type="button"
                  onClick={() => setShowRecentDropdown(!showRecentDropdown)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showRecentDropdown ? 'rotate-180' : ''}`} />
                </button>
              )}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                </motion.div>
              )}

              <AnimatePresence>
                {showRecentDropdown && filteredRecentLocations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute  top-full left-0 right-0 mt-2 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50"
                  >
                    <div className="p-2">
                      <div className="flex items-center px-3 py-2 text-white/60 t text-xs uppercase tracking-wider">
                        <Clock className="w-3 h-3 mr-2" />
                        Recent Searches
                      </div>
                      {filteredRecentLocations.map((location, index) => (
                        <motion.button
                          key={`${location.name}-${location.timestamp}`}
                          type="button"
                          onClick={() => handleSearch(location.searchQuery)}
                          className="w-full text-left px-3 py-1 lg:py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.1, delay: index * 0.05 }}
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate group-hover:text-white/90 transition-colors">
                                {location.name}
                              </p>
                              <p className="text-white/60 text-xs truncate group-hover:text-white/70 transition-colors">
                                {location.region}, {location.country}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              type="button"
              onClick={handleCancel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-4 h-4 text-white/80" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSearch;
