import React from 'react';
import { motion } from 'framer-motion';
 
import { Skeleton } from './ui/skeleton';
import LocationSearch from './LocationSearch';
import type { WeatherData } from 'types';

interface CurrentWeatherProps {
  data: WeatherData | null;
  loading?: boolean;
  onSearch?: (location: string) => void;
  searchLoading?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  data, 
  loading = false, 
  onSearch,
  searchLoading = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherOverlay = () => {
    if (!data) return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80';
    
    const condition = data.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6;
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight 
        ? 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80'
        : 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80';
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('storm')) {
      return 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80';
    } else if (condition.includes('snow') || condition.includes('blizzard')) {
      return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80';
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      return 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80';
    }
    
    return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80';
  };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 h-full transition-all duration-300 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-2"
            >
              <Skeleton className="w-8 h-8 bg-white/20 rounded-full" />
              <div>
                <Skeleton className="h-8 w-40 bg-white/20 rounded-lg mb-2" />
                <Skeleton className="h-4 w-60 bg-white/15 rounded" />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <Skeleton className="h-4 w-32 bg-white/15 rounded mb-1" />
            <Skeleton className="h-4 w-20 bg-white/15 rounded" />
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-between">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-baseline"
            >
              <Skeleton className="h-16 w-24 sm:h-20 sm:w-32 md:h-28 md:w-40 bg-white/20 rounded-lg mr-2" />
              <Skeleton className="h-8 w-8 bg-white/15 rounded" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Skeleton className="h-6 w-32 bg-white/15 rounded mb-2" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Skeleton className="h-5 w-28 bg-white/15 rounded" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/20 rounded-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/30"
        >
          <motion.div className="text-center p-2 sm:p-3 rounded-xl backdrop-blur-sm bg-white/5">
            <Skeleton className="h-3 w-8 bg-white/15 rounded mb-2 mx-auto" />
            <Skeleton className="h-5 w-12 bg-white/20 rounded mb-1 mx-auto" />
            <Skeleton className="h-3 w-6 bg-white/15 rounded mx-auto" />
          </motion.div>
          
          <motion.div className="text-center p-2 sm:p-3 rounded-xl backdrop-blur-sm bg-white/5">
            <Skeleton className="h-3 w-12 bg-white/15 rounded mb-2 mx-auto" />
            <Skeleton className="h-5 w-8 bg-white/20 rounded mx-auto" />
          </motion.div>
          
          <motion.div className="text-center p-2 sm:p-3 rounded-xl backdrop-blur-sm bg-white/5">
            <Skeleton className="h-3 w-10 bg-white/15 rounded mb-2 mx-auto" />
            <Skeleton className="h-5 w-12 bg-white/20 rounded mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
      }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 h-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl overflow-hidden"
    >
      {/* Weather Overlay Background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url(${getWeatherOverlay()})`,
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 min-w-0">
            {onSearch ? (
              <LocationSearch
                locationName={data.location.name}
                locationRegion={data.location.region}
                locationCountry={data.location.country}
                onSearch={onSearch}
                loading={searchLoading}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-1 drop-shadow-lg">
                  {data.location.name}
                </h1>
                <p className="text-white/80 text-sm drop-shadow-md">
                  {data.location.region}, {data.location.country}
                </p>
              </motion.div>
            )}
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-right ml-4"
          >
            <p className="text-white/80 text-sm drop-shadow-md">
              {formatDate(data.location.localtime)}
            </p>
            <p className="text-white/80 text-sm drop-shadow-md">
              {formatTime(data.location.localtime)}
            </p>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-between">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-baseline"
            >
              <span className="text-4xl sm:text-6xl md:text-8xl font-thin text-white mr-2 drop-shadow-2xl">
                {Math.round(data.current.temp_c)}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg">°C</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/90 text-base sm:text-lg capitalize drop-shadow-md"
            >
              {data.current.condition.text}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 drop-shadow-md"
            >
              Feels like {Math.round(data.current.feelslike_c)}°
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <img
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/30"
        >
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            className="text-center p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
          >
            <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
              Wind
            </p>
            <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
              {Math.round(data.current.wind_kph)} km/h
            </p>
            <p className="text-white/80 text-xs drop-shadow-sm">{data.current.wind_dir}</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            className="text-center p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
          >
            <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
              Humidity
            </p>
            <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
              {data.current.humidity}%
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            className="text-center p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
          >
            <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
              Pressure
            </p>
            <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
              {data.current.pressure_mb} mb
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
