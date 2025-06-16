import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
 
import { Skeleton } from './ui/skeleton';
import type { ForecastDay } from 'types';

interface WeatherForecastProps {
  forecast: ForecastDay[] | null;
  loading?: boolean;
}

//weather forecast compoenent

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, loading = false }) => {
  const [activeTab, setActiveTab] = useState('today');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl w-full relative"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <Skeleton className="h-6 w-40 bg-white/20 rounded-lg" />
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-lg p-1 w-full sm:w-auto">
          <div className="flex">
            <Skeleton className="h-8 w-20 bg-white/15 rounded mr-1" />
            <Skeleton className="h-8 w-20 bg-white/15 rounded" />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="overflow-x-auto overflow-y-visible py-2">
          <div className="flex gap-3 min-w-max px-1">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-sm min-w-[100px]"
              >
                <Skeleton className="h-3 w-12 bg-white/20 rounded mb-3" />
                <Skeleton className="w-10 h-10 bg-white/20 rounded-full mb-3" />
                <Skeleton className="h-5 w-8 bg-white/20 rounded mb-2" />
                <Skeleton className="h-4 w-12 bg-white/15 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!forecast || forecast.length === 0) {
    return null;
  }

  const todaysForecast = forecast[0]?.hour || [];
  const currentHour = new Date().getHours();
  const upcomingHours = todaysForecast.filter((hour, index) => index >= currentHour).slice(0, 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.005,
        boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.15)"
      }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 shadow-2xl w-full relative"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Weather Forecast</h2>
          
          <TabsList className="bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
            <TabsTrigger 
              value="today" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/15 data-[state=active]:shadow-lg transition-all duration-300 hover:text-white hover:bg-white/5 flex-1 sm:flex-initial text-sm px-4"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="week" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/15 data-[state=active]:shadow-lg transition-all duration-300 hover:text-white hover:bg-white/5 flex-1 sm:flex-initial text-sm px-4"
            >
              7 Days
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <TabsContent value="today" className="mt-0">
            <motion.div
              key="today"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="overflow-x-auto overflow-y-visible py-2 lg:overflow-hidden">
                <div className="flex gap-3 min-w-max px-1">
                  {upcomingHours.slice(0,10).map((hour, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        y: -2,
                        scale: 1.02,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        zIndex: 10
                      }}
                      transition={{ 
                        duration: 0.2, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/6 hover:bg-white/12 transition-all duration-200 border border-white/10 hover:border-white/25 backdrop-blur-sm min-w-[90px] sm:min-w-[100px] cursor-pointer group relative hover:shadow-lg"
                    >
                      <span className="text-white/70 text-xs mb-3 font-medium whitespace-nowrap group-hover:text-white/90 transition-colors">
                        {formatHour(hour.time)}
                      </span>
                      
                      <motion.img
                        src={`https:${hour.condition.icon}`}
                        alt={hour.condition.text}
                        className="w-8 h-8 sm:w-10 sm:h-10 mb-3 drop-shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <span className="text-white font-bold text-base sm:text-lg mb-2 group-hover:scale-105 transition-transform">
                        {Math.round(hour.temp_c)}°
                      </span>
                      
                      {hour.chance_of_rain > 0 && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                          className="text-blue-200 text-xs font-semibold bg-blue-400/25 px-2 py-0.5 rounded-full border border-blue-300/20"
                        >
                          {hour.chance_of_rain}%
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="week" className="mt-0">
            <motion.div
              key="week"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="overflow-x-auto overflow-y-visible py-2 lg:overflow-hidden">
                <div className="flex gap-3 min-w-max px-1">
                  {forecast.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        y: -2,
                        scale: 1.02,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        zIndex: 10
                      }}
                      transition={{ 
                        duration: 0.2, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/6 hover:bg-white/12 transition-all duration-200 border border-white/10 hover:border-white/25 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] cursor-pointer group relative hover:shadow-lg"
                    >
                      <span className="text-white font-semibold text-xs sm:text-sm mb-3 whitespace-nowrap group-hover:text-white/90 transition-colors">
                        {formatDate(day.date)}
                      </span>
                      
                      <motion.img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        className="w-10 h-10 sm:w-12 sm:h-12 mb-3 drop-shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <span className="text-white/80 text-xs sm:text-sm capitalize mb-3 text-center leading-tight group-hover:text-white transition-colors">
                        {day.day.condition.text}
                      </span>
                      
                      <div className="flex items-center gap-2 sm:gap-3 w-full">
                        <span className="text-white/60 text-xs sm:text-sm font-medium min-w-[25px] text-center">
                          {Math.round(day.day.mintemp_c)}°
                        </span>
                        
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden relative">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full shadow-sm" 
                          />
                        </div>
                        
                        <span className="text-white font-bold text-xs sm:text-sm min-w-[25px] text-center group-hover:scale-105 transition-transform">
                          {Math.round(day.day.maxtemp_c)}°
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default WeatherForecast;
