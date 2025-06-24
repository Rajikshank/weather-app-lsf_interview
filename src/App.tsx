/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocationManager } from "./hooks/useLocation";
import type { RecentLocation, WeatherError } from "types";
import CurrentWeather from "./components/CurrentWeather";
import WeatherHighlights from "./components/WeatherHiglights";
import WeatherForecast from "./components/WeatherForecast";
import Footer from "./components/Footer";
import { useGetWeatherForeCast } from "./hooks/usefetchWeather";

import rain from "@/assets/Rain_effect.json";
import snow from "@/assets/Snow_effect.json";
import Lottie from "react-lottie";

function App() {
  const { getDefaultLocation } = useLocationManager();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [location, setLocation] = useState<string | null>("colombo");

  const {
    data: weatherData,
    error,
    isLoading: loading,
  } = useGetWeatherForeCast(location);

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        if (localStorage.getItem("weather_recent_locations") === null) {
          console.log("getting default loc");
          const defaultLocation = await getDefaultLocation();

          setLocation(() => defaultLocation);
        }
      } catch (error) {
        console.error("Error getting default location:", error);

        setLocation(() => "Colombo");
      }
    };

    initializeLocation();
  }, []);

  async function playAudio(src: string) {
    audioRef.current = null;
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.loop = true;
    audio.play().catch((err) => {
      console.error("Audio play failed:", err);
    });
  }

  useEffect(() => {
    const condition = weatherData?.current.condition.text.toLowerCase() || "";
    const audio = audioRef.current;

    if (weatherData && location) {
      const recentLocations: RecentLocation[] =
        JSON.parse(localStorage.getItem("weather_recent_locations")) ?? [];

      const filteredRecentLocation = recentLocations.filter(
        (item) =>
          item.name !== weatherData.location.name ||
          item.region !== weatherData.location.region
      );

      console.log("saving the location ", weatherData.location.name, location);
      localStorage.setItem(
        "weather_recent_locations",
        JSON.stringify(
          [
            {
              name: weatherData.location.name,

              region: weatherData.location.region,
              country: weatherData.location.country,
              searchQuery: location,
              timestamp: Date.now(),
            },
            ...filteredRecentLocation,
          ].slice(0, 5)
        )
      );
    }

    if (condition.includes("sunny") || condition.includes("clear")) {
      if (audio) {
        audio.src = "";
      }

      return;
    } else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("storm")
    ) {
      if (audio) {
        audio.src = "";
      }
      playAudio("/rainmusic.mp3");
      return;
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      playAudio("/snowmusic.mp3");
      return;
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      if (audio) {
        audio.src = "";
      }

      return;
    } else if (condition.includes("mist") || condition.includes("fog")) {
      if (audio) {
        audio.src = "";
      }
      return;
    }

    if (audio) {
      audio.src = "";
    }
    return;
  }, [weatherData]);

  const handleSearch = (location: string) => {
    setLocation(() => location);
  };

  const getWeatherBackground = () => {
    if (!weatherData) return "from-gray-900 via-gray-800 to-gray-900";

    const condition = weatherData.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6;

    if (condition.includes("sunny") || condition.includes("clear")) {
      return isNight
        ? "from-gray-900 via-gray-800 to-slate-900"
        : "from-gray-800 via-gray-700 to-gray-500";
    } else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("storm")
    ) {
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
                loading={loading}
                onSearch={handleSearch}
                searchLoading={loading}
                error={error}
                audioref={audioRef}
              />
            </motion.div>
            <motion.div
              className="xl:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <WeatherHighlights
                data={weatherData}
                loading={loading}
                error={error}
              />
            </motion.div>
          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <WeatherForecast
              forecast={weatherData?.forecast.forecastday}
              loading={loading}
              error={error}
            />
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
