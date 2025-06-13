/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Search, MapPin, Thermometer, Eye, Wind, Droplets } from "lucide-react";
import type { WeatherData } from "types";



const LocationCard = ({
 
  currentLocation = "Negombo, Western Province",
  data ,
  setQuery = () => {},
  setLocation = () => {},isloading
}:{
    location:string,
    currentLocation:string,
    data:WeatherData,
    setQuery:(arg:any)=>void,
    setLocation:(arg:any)=>void,
    isloading:boolean
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getTimeBasedGradient = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return "from-orange-400 via-pink-400 to-purple-600"; // Morning
    } else if (hour >= 12 && hour < 18) {
      return "from-blue-400 via-cyan-400 to-teal-500"; // Afternoon
    } else if (hour >= 18 && hour < 21) {
      return "from-orange-500 via-red-500 to-purple-700"; // Evening
    } else {
      return "from-indigo-900 via-purple-900 to-pink-800"; // Night
    }
  };

  const getBackgroundPattern = () => {
    const condition = data?.current.condition.text.toLowerCase();
    if (condition?.includes('rain')) {
      return "bg-gradient-to-br from-gray-600 via-blue-700 to-indigo-800";
    } else if (condition?.includes('cloud')) {
      return "bg-gradient-to-br from-gray-500 via-slate-600 to-gray-700";
    } else if (condition?.includes('sun') || condition?.includes('clear')) {
      return `bg-gradient-to-br ${getTimeBasedGradient()}`;
    }
    return `bg-gradient-to-br ${getTimeBasedGradient()}`;
  };

  return (
    <div className={`transition-all duration-700 ease-out transform  `}>
      <div 
        className={`relative w-full rounded-3xl p-1 transition-all duration-500 ease-out transform   
          
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
    
      
        
   
        <div className={`relative rounded-3xl ${getBackgroundPattern()} backdrop-blur-xl border border-white/20 overflow-hidden`}>
  
     
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          
          <div className="relative p-8">
         
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 group">
                <MapPin className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                <h1 className="text-white font-bold text-xl tracking-wide drop-shadow-lg">
                  {currentLocation.charAt(0).toUpperCase()+currentLocation.slice(1)}
                </h1>
              </div>
       
            </div>

        
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-6xl font-bold text-white drop-shadow-2xl transition-all duration-500 hover:scale-105">
                    {data?.current.feelslike_c}
                  </span>
                  <span className="text-2xl text-white/80 font-light">°C</span>
                </div>
                <p className="text-white/90 text-lg font-medium tracking-wide drop-shadow">
                  {data?.current.condition.text}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Feels like {data?.current.temp_c}°C
                </p>
              </div>
              
         
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse"></div>
                <img
                  src={data?.current.condition.icon}
                  alt="Weather condition"
                  className="relative w-24 h-24 drop-shadow-2xl transition-all duration-500"
                />
              </div>
            </div>


<div className="border-b-1 border-white/20 my-4"></div>
      
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1">
                <Droplets className="w-6 h-6 text-white/80 mx-auto mb-2 transition-transform duration-300 hover:scale-110" />
                <p className="text-white/90 text-sm font-medium">{data?.current.humidity}%</p>
                <p className="text-white/70 text-xs">Humidity</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1">
                <Wind className="w-6 h-6 text-white/80 mx-auto mb-2 transition-transform duration-300 hover:scale-110" />
                <p className="text-white/90 text-sm font-medium">{data?.current.wind_kph}</p>
                <p className="text-white/70 text-xs">km/h</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1">
                <Eye className="w-6 h-6 text-white/80 mx-auto mb-2 transition-transform duration-300 hover:scale-110" />
                <p className="text-white/90 text-sm font-medium">{data?.current.vis_km}</p>
                <p className="text-white/70 text-xs">km</p>
              </div>
            </div>

         
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default LocationCard;