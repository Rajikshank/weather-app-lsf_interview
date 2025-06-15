import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ForecastDay } from '../types/weather';

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
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
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 shadow-2xl w-full overflow-hidden relative"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 className="text-base sm:text-xl font-semibold text-white">Weather Forecast</h2>
          
          <TabsList className="bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
            <TabsTrigger 
              value="today" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/15 data-[state=active]:shadow-lg transition-all duration-300 hover:text-white hover:bg-white/5 flex-1 sm:flex-initial text-xs sm:text-sm px-3 sm:px-4"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="week" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/15 data-[state=active]:shadow-lg transition-all duration-300 hover:text-white hover:bg-white/5 flex-1 sm:flex-initial text-xs sm:text-sm px-3 sm:px-4"
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
              transition={{ duration: 0.2 }}
              className="w-full overflow-hidden relative"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-2 sm:gap-3">
                {upcomingHours.map((hour, index) => (
                  <motion.div
                    key={hour.time}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -1,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.02,
                      ease: "easeOut"
                    }}
                    className="flex flex-col items-center p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20 backdrop-blur-sm relative z-10"
                  >
                    <span className="text-white/70 text-xs mb-2 font-medium whitespace-nowrap">
                      {formatHour(hour.time)}
                    </span>
                    
                    <motion.img
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      className="w-6 h-6 sm:w-8 sm:h-8 mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <span className="text-white font-semibold text-sm sm:text-base mb-1">
                      {Math.round(hour.temp_c)}°
                    </span>
                    
                    {hour.chance_of_rain > 0 && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 + 0.1 }}
                        className="text-blue-300 text-xs font-medium bg-blue-500/20 px-2 py-0.5 rounded-full"
                      >
                        {hour.chance_of_rain}%
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="week" className="mt-0">
            <motion.div
              key="week"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 overflow-hidden relative"
            >
              <div className="max-h-[400px] overflow-y-auto pr-1 space-y-2">
                {forecast.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.25)"
                    }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                    className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-xl hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/15 backdrop-blur-sm overflow-hidden relative z-10"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap min-w-[70px] sm:min-w-[90px]">
                        {formatDate(day.date)}
                      </span>
                      
                      <motion.img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <span className="text-white/80 text-sm sm:text-base capitalize truncate flex-1">
                        {day.day.condition.text}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
                      <span className="text-white/60 text-sm sm:text-base min-w-[30px] text-right">
                        {Math.round(day.day.mintemp_c)}°
                      </span>
                      <div className="w-12 sm:w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "70%" }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full shadow-sm" 
                        />
                      </div>
                      <span className="text-white font-semibold text-sm sm:text-base min-w-[30px] text-right">
                        {Math.round(day.day.maxtemp_c)}°
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default WeatherForecast;
