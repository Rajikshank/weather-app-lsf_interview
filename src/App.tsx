/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocationManager } from "./hooks/useLocation";
import type { WeatherData } from "types";
import CurrentWeather from "./components/CurrentWeather";
import WeatherHighlights from "./components/WeatherHiglights";
import WeatherForecast from "./components/WeatherForecast";
import Footer from "./components/Footer";
import { useGetWeatherForeCast } from "./hooks/usefetchWeather";
import RainEffect from "./components/RainEffect";
import { data } from "framer-motion/client";
import SnowEffect from "./components/SnowEffect";
import rain from "@/assets/Rain_effect.json";
import snow from "@/assets/Snow_effect.json";
import Lottie from "react-lottie";

const App = () => {
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const { addRecentLocation, getDefaultLocation } = useLocationManager();
  const [location, setLocation] = useState<string>("Colombo");

  const {
    data: weatherData,
    error,
    isLoading: loading,
  } = useGetWeatherForeCast(location);

  // Get user's location on mount
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const defaultLocation = await getDefaultLocation();
        setLocation(() => defaultLocation);
      } catch (error) {
        console.error("Error getting default location:", error);
        // fetchWeatherData("Colombo");

        setLocation(() => "colombo");
      }
    };

    initializeLocation();
  }, []);

  // const fetchWeatherData = async (location: string) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  //     const response = await fetch(
  //       `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes`
  //     );

  //     if (!response.ok) {
  //       // If API call fails,
  //       console.log("Using mock data for demonstration");
  //       const error = await response.json();
  //       setError(() => error);
  //       return;
  //     }

  //     const data = await response.json();
  //     setWeatherData(data);

  //     // Add to recent locations
  //     addRecentLocation({
  //       name: data.location.name,
  //       region: data.location.region,
  //       country: data.location.country,
  //       searchQuery: location,
  //     });
  //   } catch (err) {
  //     console.log("Using mock data for demonstration");

  //     // Add to recent locations with mock data
  //     setError(()=>"something went wrong...")
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (location: string) => {
    setLocation(() => location);
  };

  const getWeatherBackground = async () => {
    if (!weatherData) return "from-gray-900 via-gray-800 to-gray-900";

    const condition = weatherData.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6;

    if (condition.includes("sunny") || condition.includes("clear")) {
      return isNight
        ? "from-gray-900 via-gray-800 to-slate-900"
        : "from-gray-800 via-gray-700 to-gray-800";
    } else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("storm")
    ) {
      const audio=new Audio("/rainmusic.wav") 

      audio.loop=true
      audio.play()

      return "from-gray-950 via-black to-gray-900";
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      return "from-slate-900 via-gray-800 to-slate-900";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return "from-gray-900 via-gray-850 to-gray-900";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "from-gray-800 via-gray-700 to-gray-800";
    }

    return "from-gray-900 via-gray-800 to-gray-900";
  };

  const getGradientDirection = () => {
    if (!weatherData) return "bg-gradient-to-br";

    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
      return "bg-gradient-to-tr";
    } else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("storm")
    ) {
      return "bg-gradient-to-b";
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      return "bg-gradient-to-bl";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return "bg-gradient-to-br";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "bg-gradient-to-r";
    }

    return "bg-gradient-to-br";
  };

  const getFloatingElements = () => {
    if (!weatherData) return null;

    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("rain") || condition.includes("drizzle")) {
      // return <RainEffect dropCount={250} />;

      return (
        <div className="absolute">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: rain,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={1400}
            width={1800}
          />
        </div>
      );
    } else if (condition.includes("snow")) {
      // return <SnowEffect />;

      return (
        <div className="absolute">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: snow,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={1400}
            width={1800}
          />
        </div>
      );
    }

    return null;
  };

  const getBackgroundPattern = () => {
    if (!weatherData) return null;

    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
      return (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400/20 rounded-full blur-lg animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-300/25 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
      );
    } else if (condition.includes("cloud")) {
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={`min-h-screen ${getGradientDirection()} ${getWeatherBackground()} transition-all duration-[2000ms] ease-in-out relative overflow-hidden flex flex-col`}
    >
      {getBackgroundPattern()}

      {getFloatingElements()}
      {/* <RainEffect dropCount={250} />
      <SnowEffect /> */}

      {/* <div className="absolute">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: rain,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={1400}
            width={1800}
          />
        </div>

              <div className="absolute ">
          <Lottie
            options={{
            
              loop: true,
              autoplay: true,
              animationData: snow,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
              },
            }}
            height={1400}
            width={1800}
          />
        </div> */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-black/10" />

      <div className="relative z-10 flex-1 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                className="xl:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <CurrentWeather
                  data={null}
                  loading={true}
                  onSearch={handleSearch}
                  searchLoading={loading}
                />
              </motion.div>
              <motion.div
                className="xl:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <WeatherHighlights data={null} loading={true} />
              </motion.div>
            </div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <WeatherForecast forecast={null} loading={true} />
            </motion.div>
          </motion.div>
        ) : weatherData ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                className="xl:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <CurrentWeather
                  data={weatherData}
                  loading={false}
                  onSearch={handleSearch}
                  searchLoading={loading}
                  error={error}
                />
              </motion.div>
              <motion.div
                className="xl:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <WeatherHighlights data={weatherData} loading={false} />
              </motion.div>
            </div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <WeatherForecast
                forecast={weatherData.forecast.forecastday}
                loading={false}
              />
            </motion.div>
          </motion.div>
        ) : (
          <div>
            <motion.div className="flex h-svh items-center justify-center flex-col">
              <motion.h2
                className="text-2xl font-semibold text-white"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
              >
                Something went wrong....
              </motion.h2>

              <motion.h2
                className="text-white"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
              >
                Refresh the Page Again...
              </motion.h2>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
