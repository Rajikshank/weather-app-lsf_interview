import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';
import { Sun, Cloud, Eye } from 'lucide-react';

interface WeatherHighlightsProps {
  data: WeatherData;
}

const WeatherHighlights: React.FC<WeatherHighlightsProps> = ({ data }) => {
  const getUVLevel = (uv: number) => {
    if (uv < 3) return { level: 'Low', color: 'text-green-400' };
    if (uv < 6) return { level: 'Moderate', color: 'text-yellow-400' };
    if (uv < 8) return { level: 'High', color: 'text-orange-400' };
    if (uv < 11) return { level: 'Very High', color: 'text-red-400' };
    return { level: 'Extreme', color: 'text-purple-400' };
  };

  const uvInfo = getUVLevel(data.current.uv);

  const highlights = [
    {
      title: 'UV Index',
      value: data.current.uv.toFixed(1),
      subtitle: uvInfo.level,
      icon: Sun,
      color: uvInfo.color,
      progress: (data.current.uv / 12) * 100
    },
    {
      title: 'Visibility',
      value: `${data.current.vis_km}`,
      subtitle: 'km',
      icon: Eye,
      color: 'text-blue-400',
      progress: (data.current.vis_km / 10) * 100
    },
    {
      title: 'Cloud Cover',
      value: `${data.current.cloud}`,
      subtitle: '%',
      icon: Cloud,
      color: 'text-gray-400',
      progress: data.current.cloud
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Today's Highlights</h2>
      
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.03,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1)"
          }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <highlight.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
              </motion.div>
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                {highlight.title}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-light text-white">
                {highlight.value}
              </span>
              <span className={`text-xs sm:text-sm ${highlight.color}`}>
                {highlight.subtitle}
              </span>
            </div>
            
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(highlight.progress, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      {data.current.air_quality && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.03,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1)"
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-white/80 text-xs sm:text-sm font-medium mb-3 sm:mb-4 flex items-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-2 h-2 bg-green-400 rounded-full mr-2"
            />
            Air Quality
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="p-2 rounded-lg bg-white/5">
              <p className="text-white/60 text-xs mb-1">PM2.5</p>
              <p className="text-white text-lg sm:text-xl font-light">
                {data.current.air_quality.pm2_5.toFixed(1)}
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-2 rounded-lg bg-white/5">
              <p className="text-white/60 text-xs mb-1">PM10</p>
              <p className="text-white text-lg sm:text-xl font-light">
                {data.current.air_quality.pm10.toFixed(1)}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherHighlights;
