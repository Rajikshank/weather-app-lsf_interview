import React from "react";
import { motion } from "framer-motion";
import type { WeatherData } from "types";
import { Sun, Cloud, Eye, Wind, AlertCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface WeatherHighlightsProps {
  data: WeatherData | null;
  loading?: boolean;
  error?: Error | null;
}

//weather higlights component

const WeatherHighlights: React.FC<WeatherHighlightsProps> = ({
  data,
  loading = false,error
}) => {
  const getUVLevel = (uv: number) => {
    if (uv < 3)
      return {
        level: "Low",
        color: "text-green-400",
        bgColor: "bg-green-400/20",
        ringColor: "ring-green-400/30",
      };
    if (uv < 6)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/20",
        ringColor: "ring-yellow-400/30",
      };
    if (uv < 8)
      return {
        level: "High",
        color: "text-orange-400",
        bgColor: "bg-orange-400/20",
        ringColor: "ring-orange-400/30",
      };
    if (uv < 11)
      return {
        level: "Very High",
        color: "text-red-400",
        bgColor: "bg-red-400/20",
        ringColor: "ring-red-400/30",
      };
    return {
      level: "Extreme",
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
      ringColor: "ring-purple-400/30",
    };
  };

  const getVisibilityLevel = (vis: number) => {
    if (vis >= 10)
      return {
        level: "Excellent",
        color: "text-green-400",
        bgColor: "bg-green-400/20",
      };
    if (vis >= 5)
      return {
        level: "Good",
        color: "text-blue-400",
        bgColor: "bg-blue-400/20",
      };
    if (vis >= 2)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/20",
      };
    return { level: "Poor", color: "text-red-400", bgColor: "bg-red-400/20" };
  };

  const getAirQualityLevel = (pm25: number) => {
    if (pm25 <= 12)
      return {
        level: "Good",
        color: "text-green-400",
        bgColor: "bg-green-400/20",
      };
    if (pm25 <= 35)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/20",
      };
    if (pm25 <= 55)
      return {
        level: "Unhealthy for Sensitive",
        color: "text-orange-400",
        bgColor: "bg-orange-400/20",
      };
    if (pm25 <= 150)
      return {
        level: "Unhealthy",
        color: "text-red-400",
        bgColor: "bg-red-400/20",
      };
    return {
      level: "Hazardous",
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
    };
  };

  const uvInfo = data
    ? getUVLevel(data.current.uv)
    : { level: "", color: "", bgColor: "", ringColor: "" };
  const visInfo = data
    ? getVisibilityLevel(data.current.vis_km)
    : { level: "", color: "", bgColor: "" };
  const airQualityInfo = data?.current.air_quality
    ? getAirQualityLevel(data.current.air_quality.pm2_5)
    : { level: "", color: "", bgColor: "" };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <Skeleton className="h-6 w-44 bg-white/10 rounded-lg" />

      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-xl border lg:h-[185px] border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-5 h-5 bg-white/20 rounded-full" />
              <Skeleton className="h-4 w-24 bg-white/20 rounded" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline space-x-2">
              <Skeleton className="h-8 w-20 bg-white/20 rounded" />
              <Skeleton className="h-4 w-12 bg-white/20 rounded" />
            </div>

            <Skeleton className="w-full h-2 bg-white/10 rounded-full" />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white/5 backdrop-blur-xl border lg:h-[185px] border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center mb-4">
          <Skeleton className="w-2 h-2 bg-white/20 rounded-full mr-2" />
          <Skeleton className="h-4 w-28 bg-white/20 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-white/5">
            <Skeleton className="h-3 w-12 bg-white/20 rounded mb-2" />
            <Skeleton className="h-6 w-16 bg-white/20 rounded" />
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <Skeleton className="h-3 w-12 bg-white/20 rounded mb-2" />
            <Skeleton className="h-6 w-16 bg-white/20 rounded" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!data || error) {
    return   <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
        Today's Highlights
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border ring-1 ring-red-500 border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
         

        <div className="space-y-4 flex items-center justify-center">
           <AlertCircle className="text-red-500 size-32 animate-pulse"/>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-xl border ring-1 ring-red-500 border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
       <div className="space-y-4 flex items-center justify-center">
           <AlertCircle className="text-red-500 size-32 animate-pulse"/>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-xl border ring-1 ring-red-500 border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
         <div className="space-y-4 flex items-center justify-center">
           <AlertCircle className="text-red-500 size-32 animate-pulse"/>
        </div>
      </motion.div>

     
    
     
    </motion.div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-4"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
        Today's Highlights
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-full ${uvInfo.bgColor} ring-2 ${uvInfo.ringColor}`}
            >
              <Sun className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium">UV Index</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${uvInfo.bgColor} ${uvInfo.color} border border-current/20`}
          >
            {uvInfo.level}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-light text-white">
              {data.current.uv.toFixed(1)}
            </span>
            <span className="text-sm text-white/60">out of 12</span>
          </div>

          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((data.current.uv / 12) * 100, 100)}%`,
                }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-3 rounded-full shadow-lg transition-all duration-300 ${
                  data.current.uv < 3
                    ? "bg-green-400"
                    : data.current.uv < 6
                    ? "bg-yellow-400"
                    : data.current.uv < 8
                    ? "bg-orange-400"
                    : data.current.uv < 11
                    ? "bg-red-400"
                    : "bg-purple-400"
                }`}
              />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>0</span>
              <span>6</span>
              <span>12</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-full ${visInfo.bgColor} ring-2 ring-blue-400/30`}
            >
              <Eye className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium">
              Visibility
            </span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${visInfo.bgColor} ${visInfo.color} border border-current/20`}
          >
            {visInfo.level}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-light text-white">
              {data.current.vis_km}
            </span>
            <span className="text-sm text-blue-400">km</span>
          </div>

          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min((data.current.vis_km / 15) * 100, 100)}%`,
                }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full shadow-lg"
              />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>0 km</span>
              <span>15+ km</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-full bg-gray-400/20 ring-2 ring-gray-400/30"
            >
              <Cloud className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium">
              Cloud Cover
            </span>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-400/20 text-gray-300 border border-gray-400/20">
            {data.current.cloud < 25
              ? "Clear"
              : data.current.cloud < 50
              ? "Partly Cloudy"
              : data.current.cloud < 75
              ? "Mostly Cloudy"
              : "Overcast"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-light text-white">
              {data.current.cloud}
            </span>
            <span className="text-sm text-gray-400">%</span>
          </div>

          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.current.cloud}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-gradient-to-r from-gray-400 to-slate-500 h-3 rounded-full shadow-lg"
              />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {data.current.air_quality && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`p-2 rounded-full ${airQualityInfo.bgColor} ring-2 ring-current/30`}
              >
                <Wind className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-white/80 text-sm font-medium">
                Air Quality
              </span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${airQualityInfo.bgColor} ${airQualityInfo.color} border border-current/20`}
            >
              {airQualityInfo.level}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-xs font-medium">PM2.5</p>
                <div
                  className={`w-2 h-2 rounded-full ${
                    data.current.air_quality.pm2_5 <= 12
                      ? "bg-green-400"
                      : data.current.air_quality.pm2_5 <= 35
                      ? "bg-yellow-400"
                      : data.current.air_quality.pm2_5 <= 55
                      ? "bg-orange-400"
                      : "bg-red-400"
                  }`}
                />
              </div>
              <p className="text-white text-xl font-light">
                {data.current.air_quality.pm2_5.toFixed(1)}
              </p>
              <p className="text-white/40 text-xs mt-1">μg/m³</p>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/60 text-xs font-medium">PM10</p>
                <div
                  className={`w-2 h-2 rounded-full ${
                    data.current.air_quality.pm10 <= 54
                      ? "bg-green-400"
                      : data.current.air_quality.pm10 <= 154
                      ? "bg-yellow-400"
                      : data.current.air_quality.pm10 <= 254
                      ? "bg-orange-400"
                      : "bg-red-400"
                  }`}
                />
              </div>
              <p className="text-white text-xl font-light">
                {data.current.air_quality.pm10.toFixed(1)}
              </p>
              <p className="text-white/40 text-xs mt-1">μg/m³</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherHighlights;
