import React, { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import type { WeatherData, WeatherError } from "types";
import { Skeleton } from "./ui/skeleton";
import LocationSearch from "./LocationSearch";
import weatherIconMap from "@/lib/getWeatherIcon";
import { AlertTriangle, Megaphone, MegaphoneOff } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData | null;
  loading?: boolean;
  onSearch?: (location: string) => void;
  searchLoading?: boolean;
  error?: Error | WeatherError | null;
  audioref?: RefObject<HTMLAudioElement>;
}

//current weather component

function CurrentWeather({
  data,
  loading = false,
  onSearch,
  searchLoading = false,
  error = null,
  audioref,
}: CurrentWeatherProps) {
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    setMuted(() => false);
  }, [data]);

  //function to formate the datestring to local date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //function to format the time from date string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // function to get weather overly images based on current weather conditions
  const getWeatherOverlay = () => {
    if (!data)
      return "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80";

    const condition = data.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour <= 6;

    if (condition.includes("sunny") || condition.includes("clear")) {
      return isNight
        ? "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80"
        : "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80";
    } else if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("storm")
    ) {
      return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80";
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      return "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80";
    }

    return "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80";
  };

  // component to show loading state
  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
              className="flex items-center space-x-3"
            >
              <Skeleton className="w-8 h-8 bg-white/20 rounded-full animate-pulse" />
              <div>
                <Skeleton className="h-7 w-48 bg-white/20 rounded-lg mb-2 animate-pulse" />
                <Skeleton className="h-4 w-56 bg-white/15 rounded animate-pulse" />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-right"
          >
            <Skeleton className="h-4 w-32 bg-white/15 rounded mb-1 animate-pulse" />
            <Skeleton className="h-4 w-20 bg-white/15 rounded animate-pulse" />
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-between">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-baseline"
            >
              <Skeleton className="h-20 w-32 sm:h-24 sm:w-40 md:h-32 md:w-48 bg-white/20 rounded-lg mr-3 animate-pulse" />
              <Skeleton className="h-8 w-8 bg-white/15 rounded animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Skeleton className="h-6 w-40 bg-white/15 rounded mb-2 animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Skeleton className="h-5 w-32 bg-white/15 rounded animate-pulse" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/20 rounded-full animate-pulse" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/30"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="text-center p-3 rounded-xl backdrop-blur-sm bg-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <Skeleton className="h-3 w-12 bg-white/15 rounded mb-2 mx-auto animate-pulse" />
              <Skeleton className="h-6 w-16 bg-white/20 rounded mb-1 mx-auto animate-pulse" />
              <Skeleton className="h-3 w-8 bg-white/15 rounded mx-auto animate-pulse" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  // component to display errors
  const ErrorDisplay = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/5 ring-1 ring-red-500 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:h-[620px] transition-all duration-300 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-800/10" />
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col h-full items-center justify-center text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-4 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30"
        >
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-medium text-white mb-2">
            Weather Unavailable
          </h3>
          <p className="text-white/70 text-sm max-w-md">
            {(error && "error" in error && error.error?.message) ||
              (error && "message" in error && error.message) ||
              "Unable to fetch weather data. Please try again."}
          </p>
        </motion.div>

        {onSearch && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => onSearch('"Colombo')}
            className="px-6 py-2 cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full text-white text-sm transition-all duration-300 backdrop-blur-md"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!data || error) {
    return <ErrorDisplay />;
  }

  //function to handle mute the ambient audio
  function handleMute() {
    if (audioref.current) {
      const audio = audioref.current;

      audio.muted = audio.muted ? false : true;

      setMuted(() => (audio.muted ? true : false));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
      }}
      transition={{ duration: 0.5 }}
      className="relative  bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 h-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${getWeatherOverlay()})`,
            filter: "blur(1px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col md:flex-row items-start gap-2 lg:gap-0 lg:items-center justify-between mb-6">
          <div className="flex-1 min-h-[70px]  lg:min-h-[80px]  min-w-0">
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
          {!error && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className=" lg:text-right ml-1 lg:ml-4"
            >
              <p className="font-roboto text-white/80 text-xs  lg:text-sm drop-shadow-md">
                {formatDate(data.location.localtime)}
              </p>
              <p className="font-roboto text-white/80 text-sm drop-shadow-md">
                {formatTime(data.location.localtime)}
              </p>
            </motion.div>
          )}
        </div>

        {!error && (
          <>
            {" "}
            <div className="flex-1 flex  items-center justify-between">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-baseline"
                >
                  <span className="text-4xl font-roboto  sm:text-6xl md:text-8xl  text-white mr-2 drop-shadow-2xl">
                    {Math.round(data.current.temp_c)}
                  </span>
                  <span className="text-xl font-roboto sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg">
                    °C
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white/90 font-roboto text-base sm:text-lg capitalize drop-shadow-md"
                >
                  {data.current.condition.text}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/80 drop-shadow-md font-roboto"
                >
                  Feels like {Math.round(data.current.feelslike_c)}°
                </motion.p>

                <button
                  onClick={() => handleMute()}
                  className="cursor-pointer hover:bg-white/20 hover:scale-110 hover:rounded-full p-1"
                >
                  <div className="transition-all duration-500 ease-in-out">
                    {!muted ? (
                      <Megaphone className="text-white size-6" />
                    ) : (
                      <MegaphoneOff className="text-white/80 size-6" />
                    )}
                  </div>
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-shrink-0"
              >
                <img
                  src={
                    weatherIconMap[data.current.condition.code][
                      data.current.is_day === 1 ? "day" : "night"
                    ]
                  }
                  alt={data.current.condition.text}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-2xl"
                />

                {/* <img
                  src={`https:${data.current.condition.icon}`}
                  alt={data.current.condition.text}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-2xl"
                /> */}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/30"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="text-center ring-1 ring-white/50 p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
              >
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
                  Wind
                </p>
                <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
                  {Math.round(data.current.wind_kph)} km/h
                </p>
                <p className="text-white/80 text-xs drop-shadow-sm">
                  {data.current.wind_dir}
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="text-center ring-1 ring-white/50 p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
              >
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
                  Humidity
                </p>
                <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
                  {data.current.humidity}%
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="text-center ring-1 ring-white/50 p-2 sm:p-3 rounded-xl transition-all duration-200 backdrop-blur-sm bg-white/5"
              >
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1 drop-shadow-sm">
                  Pressure
                </p>
                <p className="text-white text-sm sm:text-lg font-medium drop-shadow-md">
                  {data.current.pressure_mb} mb
                </p>
              </motion.div>
            </motion.div>{" "}
          </>
        )}

        {error && (
          <motion.div className="flex flex-col my-auto items-center">
            <motion.h2
              className="text-white font-semibold text-2xl"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
            >
              Something went wrong
            </motion.h2>

            <motion.h2
              className="text-white font-semibold"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
            >
              Please Try Again
            </motion.h2>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default CurrentWeather;
