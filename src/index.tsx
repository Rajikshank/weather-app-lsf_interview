import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
 
 

import CurrentWeather from './components/CurrentWeather';
import WeatherHighlights from './components/WeatherHiglights';
import WeatherForecast from './components/WeatherForecast';
import type { WeatherData } from 'types';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // Fallback to a default location
          fetchWeatherData('Colombo');
        }
      );
    } else {
      fetchWeatherData('New York');
    }
  }, []);

  const fetchWeatherData = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const API_KEY = 'demo_key'; // Users will need to replace this
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}&days=7&aqi=yes`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Unable to fetch weather data. Please try again.');
      // For demo purposes, set some mock data
      setWeatherData(mockWeatherData);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    await fetchWeatherData(`${lat},${lon}`);
  };

  const handleSearch = (location: string) => {
    fetchWeatherData(location);
  };

  const getWeatherBackground = () => {
    if (!weatherData) return 'from-slate-900 via-purple-900 to-indigo-900';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6;

    console.log("conditon inside gw function ",condition)
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight 
        ? 'from-indigo-900 via-purple-900 to-blue-900'
        : 'from-amber-400 via-orange-500 to-pink-500';
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('storm')) {
      return 'from-slate-800 via-gray-900 to-blue-900';
    } else if (condition.includes('snow') || condition.includes('blizzard')) {
      return 'from-blue-400 via-indigo-500 to-purple-600';
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      return 'from-gray-700 via-slate-800 to-gray-900';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      return 'from-gray-500 via-slate-600 to-gray-700';
    }
    
    return 'from-slate-900 via-purple-900 to-indigo-900';
  };



  const getFloatingElements = () => {
    if (!weatherData) return null;
    
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200/40 rounded-full"
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{ 
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth 
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('snow')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/50 rounded-full"
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{ 
                y: window.innerHeight + 100,
                x: Math.random() * window.innerWidth + Math.sin(i) * 50
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  const getBackgroundPattern = () => {
    if (!weatherData) return null;
    
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400/20 rounded-full blur-lg animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-300/25 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
      );
    } else if (condition.includes('cloud')) {
      return (
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-16 left-16 w-32 h-16 bg-gray-300/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-40 right-24 w-28 h-14 bg-slate-400/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-1/3 w-36 h-18 bg-gray-400/25 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getWeatherBackground()} transition-all duration-1000 relative overflow-hidden `}>
   
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/4 rounded-full blur-3xl" 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
 
      {getBackgroundPattern()}
      
    
      {getFloatingElements()}
      
     
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-transparent backdrop-blur-[2px]" />
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
      

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl text-red-200 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64 sm:h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full"
            />
          </div>
        ) : weatherData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4  sm:space-y-6"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div className="xl:col-span-2">
                <CurrentWeather data={weatherData}  onSearch={handleSearch} loading={loading}  />
              </div>
              <div className="xl:col-span-1">
                <WeatherHighlights data={weatherData} />
              </div>
            </div>
            
            <div className="w-full">
              <WeatherForecast forecast={weatherData.forecast.forecastday} />
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

 
const mockWeatherData = {
  location: {
    name: "New York",
    region: "New York",
    country: "United States of America",
    localtime: "2024-06-15 14:30"
  },
  current: {
    temp_c: 28,
    temp_f: 82,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
    },
    wind_mph: 7.9,
    wind_kph: 12.6,
    wind_dir: "WSW",
    pressure_mb: 1013,
    pressure_in: 29.91,
    humidity: 84,
    cloud: 50,
    feelslike_c: 31,
    vis_km: 10,
    vis_miles: 6,
    uv: 5.5,
    air_quality: {
      pm2_5: 12.3,
      pm10: 15.1
    }
  },
  forecast: {
    forecastday: [
      {
        date: "2024-06-15",
        day: {
          maxtemp_c: 29,
          mintemp_c: 18,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
          }
        },
        hour: [
          { time: "2024-06-15 00:00", temp_c: 20, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 01:00", temp_c: 19, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 02:00", temp_c: 18, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 03:00", temp_c: 18, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 04:00", temp_c: 17, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 05:00", temp_c: 18, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 06:00", temp_c: 20, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 07:00", temp_c: 22, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 08:00", temp_c: 24, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 09:00", temp_c: 26, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 10:00", temp_c: 27, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, chance_of_rain: 5 },
          { time: "2024-06-15 11:00", temp_c: 28, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, chance_of_rain: 10 },
          { time: "2024-06-15 12:00", temp_c: 29, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, chance_of_rain: 15 },
          { time: "2024-06-15 13:00", temp_c: 29, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, chance_of_rain: 20 },
          { time: "2024-06-15 14:00", temp_c: 28, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, chance_of_rain: 25 },
          { time: "2024-06-15 15:00", temp_c: 27, condition: { text: "Light rain", icon: "//cdn.weatherapi.com/weather/64x64/day/296.png" }, chance_of_rain: 60 },
          { time: "2024-06-15 16:00", temp_c: 26, condition: { text: "Light rain", icon: "//cdn.weatherapi.com/weather/64x64/day/296.png" }, chance_of_rain: 70 },
          { time: "2024-06-15 17:00", temp_c: 25, condition: { text: "Light rain", icon: "//cdn.weatherapi.com/weather/64x64/day/296.png" }, chance_of_rain: 65 },
          { time: "2024-06-15 18:00", temp_c: 24, condition: { text: "Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/119.png" }, chance_of_rain: 30 },
          { time: "2024-06-15 19:00", temp_c: 23, condition: { text: "Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/119.png" }, chance_of_rain: 20 },
          { time: "2024-06-15 20:00", temp_c: 22, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/night/116.png" }, chance_of_rain: 10 },
          { time: "2024-06-15 21:00", temp_c: 21, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 22:00", temp_c: 20, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 },
          { time: "2024-06-15 23:00", temp_c: 19, condition: { text: "Clear", icon: "//cdn.weatherapi.com/weather/64x64/night/113.png" }, chance_of_rain: 0 }
        ]
      },
      {
        date: "2024-06-16",
        day: {
          maxtemp_c: 21,
          mintemp_c: 16,
          condition: {
            text: "Light rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
          }
        },
        hour: []
      },
      {
        date: "2024-06-17",
        day: {
          maxtemp_c: 24,
          mintemp_c: 20,
          condition: {
            text: "Moderate rain",
            icon: "//cdn.weatherapi.com/weather/64x64/day/302.png"
          }
        },
        hour: []
      },
      {
        date: "2024-06-18",
        day: {
          maxtemp_c: 30,
          mintemp_c: 17,
          condition: {
            text: "Sunny",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
          }
        },
        hour: []
      }
    ]
  }
};

export default Index;
