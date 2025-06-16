import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

interface LocationSearchProps {
  locationName: string;
  locationRegion: string;
  locationCountry: string;
  onSearch: (location: string) => void;
  loading: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  locationName, 
  locationRegion, 
  locationCountry, 
  onSearch, 
  loading 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleCancel = () => {
    setQuery('');
    setIsSearchOpen(false);
  };

  return (
    <div className="relative">
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
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 pl-12 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                disabled={loading}
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              
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
