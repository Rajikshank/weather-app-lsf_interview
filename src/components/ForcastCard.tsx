/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Thermometer,
  Eye,
  Wind,
  Droplets,
  CloudFog,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Type definitions for WeatherAPI.com forecast data
interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface HourlyForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
}

interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
  };
  hour: HourlyForecast[];
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

interface ProcessedForecastData {
  date: string;
  day: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  maxtemp_c: number;
  mintemp_c: number;
}

interface ProcessedHourlyData {
  time: string;
  hour: string;
  temp_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  chance_of_rain: number;
}

const ForecastCard = ({
  currentLocation = "Negombo, Western Province",
  data,
  setQuery = () => {},
  setLocation = () => {},
  isloading = false,
}: {
  location?: string;
  currentLocation?: string;
  data: WeatherData | null;
  setQuery?: (arg: any) => void;
  setLocation?: (arg: any) => void;
  isloading?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "7day">("today");
  const [weatherData, setWeatherData] = useState<ProcessedForecastData[]>([]);
  const [hourlyData, setHourlyData] = useState<ProcessedHourlyData[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  useEffect(() => {
    if (!data?.forecast?.forecastday) return;

    // Add transition effect
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      if (activeTab === "today") {
        // Get today's hourly forecast
        const todayForecast = data.forecast.forecastday[0];
        if (todayForecast) {
          const currentHour = new Date().getHours();
          const relevantHours = todayForecast.hour.slice(currentHour, Math.min(currentHour + 8, 24));
          
          const processedHourly: ProcessedHourlyData[] = relevantHours.map((hour) => ({
            time: hour.time,
            hour: new Date(hour.time).toLocaleTimeString("en-US", { 
              hour: "numeric", 
              hour12: true 
            }),
            temp_c: hour.temp_c,
            condition: hour.condition,
            wind_kph: hour.wind_kph,
            humidity: hour.humidity,
            chance_of_rain: hour.chance_of_rain,
          }));
          
          setHourlyData(processedHourly);
          setWeatherData([]);
        }
      } else if (activeTab === "7day") {
     
        const processedForecast: ProcessedForecastData[] = data.forecast.forecastday.map((forecastDay) => ({
          date: forecastDay.date,
          day: new Date(forecastDay.date).toLocaleDateString("en-US", { 
            weekday: "short" 
          }),
          temp_c: forecastDay.day.avgtemp_c,
          temp_f: forecastDay.day.avgtemp_f,
          condition: forecastDay.day.condition,
          wind_kph: forecastDay.day.maxwind_kph,
          humidity: forecastDay.day.avghumidity,
          maxtemp_c: forecastDay.day.maxtemp_c,
          mintemp_c: forecastDay.day.mintemp_c,
        }));
        
        setWeatherData(processedForecast);
        setHourlyData([]);
      }
      
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeTab, data]);

  const getBackgroundPattern = () => {
    if (!data?.current?.condition?.text) return `bg-gradient-to-br ${getTimeBasedGradient()}`;
    
    const condition = data.current.condition.text.toLowerCase();
    if (condition.includes("rain")) {
      return "bg-gradient-to-br from-gray-600 via-blue-700 to-indigo-800";
    } else if (condition.includes("cloud")) {
      return "bg-gradient-to-br from-gray-500 via-slate-600 to-gray-700";
    } else if (condition.includes("sun") || condition.includes("clear")) {
      return `bg-gradient-to-br ${getTimeBasedGradient()}`;
    }
    return `bg-gradient-to-br ${getTimeBasedGradient()}`;
  };

  if (isloading) {
    return (
      <div className="relative w-full h-full rounded-3xl p-1">
        <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 backdrop-blur-xl border border-white/20 overflow-hidden">
          <div className="relative h-full p-8 flex items-center justify-center">
            <div className="text-white text-lg">Loading weather data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative w-full h-full rounded-3xl p-1">
        <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 backdrop-blur-xl border border-white/20 overflow-hidden">
          <div className="relative h-full p-8 flex items-center justify-center">
            <div className="text-white text-lg">No weather data available</div>
          </div>
        </div>
      </div>
    );
  }

  const displayData = activeTab === "today" ? hourlyData : weatherData;

  return (
    <div
      className="relative w-full h-full rounded-3xl p-1 transition-all duration-500 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-full rounded-3xl ${getBackgroundPattern()} backdrop-blur-xl border border-white/20 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>

        <div className="relative h-full p-8">
          {/* Tab Navigation */}
          <div className="lg:mb-10 md:mb-4 mb-4 flex gap-2 bg-slate-400 w-fit p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("today")}
              className={cn(
                "font-semibold cursor-pointer lg:p-2 p-1 rounded-lg text-xs lg:text-sm inline-flex gap-2 items-center transition-all duration-300",
                activeTab === "today"
                  ? "bg-slate-600 text-white ring-white/50 ring-1"
                  : "text-slate-300 hover:text-white"
              )}
            >
              <Sun
                className={`size-4 ${
                  activeTab === "today" ? "rotate-180" : "rotate-0"
                } transition-all ease-in-out duration-500`}
              />
              Today's Forecast
            </button>
            <button
              onClick={() => setActiveTab("7day")}
              className={cn(
                "font-semibold cursor-pointer lg:p-2 p-1 rounded-lg text-xs lg:text-sm inline-flex gap-2 items-center transition-all duration-300",
                activeTab === "7day"
                  ? "bg-slate-600 text-white ring-white/50 ring-1"
                  : "text-slate-300 hover:text-white"
              )}
            >
              <CloudFog
                className={`size-4 ${
                  activeTab === "7day" ? "scale-110" : "scale-100"
                } transition-all ease-in-out duration-500`}
              />
              7 Day Forecast
            </button>
          </div>

          
          <div className={`grid gap-4 ${activeTab === "today" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-7"}`}>
            {activeTab === "today" ? (
              
              hourlyData.map((hourData, index) => (
                <div key={index} className="flex flex-col justify-center items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-white text-sm mb-2">{hourData.hour}</h3>
                  <img src={hourData.condition.icon} alt={hourData.condition.text} width={60} height={60} className="mb-2" />
                  <h2 className="font-bold text-white text-xl mb-1">{Math.round(hourData.temp_c)}°</h2>
                  <div className="text-white text-xs flex items-center gap-1 mb-1">
                    <Wind className="size-3" /> {Math.round(hourData.wind_kph)} km/h
                  </div>
                  <div className="text-white text-xs flex items-center gap-1 mb-1">
                    <Droplets className="size-3" /> {hourData.chance_of_rain}%
                  </div>
                  <p className="text-white text-xs text-center">{hourData.condition.text}</p>
                </div>
              ))
            ) : (
            
              weatherData.map((dayData, index) => (
                <div key={index} className="flex flex-col justify-center items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-white text-sm mb-2">{dayData.day}</h3>
                  <img src={dayData.condition.icon} alt={dayData.condition.text} width={60} height={60} className="mb-2" />
                  <div className="text-center mb-2">
                    <h2 className="font-bold text-white text-lg">{Math.round(dayData.maxtemp_c)}°</h2>
                    <h3 className="text-white/70 text-sm">{Math.round(dayData.mintemp_c)}°</h3>
                  </div>
                  <div className="text-white text-xs flex items-center gap-1 mb-1">
                    <Wind className="size-3" /> {Math.round(dayData.wind_kph)} km/h
                  </div>
                  <div className="text-white text-xs flex items-center gap-1 mb-1">
                    <Droplets className="size-3" /> {dayData.humidity}%
                  </div>
                  <p className="text-white text-xs text-center">{dayData.condition.text}</p>
                </div>
              ))
            )}
          </div>

       
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;