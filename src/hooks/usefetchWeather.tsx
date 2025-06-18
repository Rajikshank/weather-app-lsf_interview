import { useMemo } from "react";
import type { WeatherData } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface UseGetWeatherResult {
  data: WeatherData | null;
  error: unknown;
  isLoading: boolean;
}

export function useGetWeatherForeCast(location: string) {
  // const queryClient = useQueryClient();
  const url = useMemo(() => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    return `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(
      location
    )}&days=7&aqi=no&alerts=no`;
  }, [location]);

  
  const query = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        const errBody = await res.json();
        throw {
          error: {
            message: errBody.error?.message || res.statusText,
            code: errBody.code,
          },
        };
      }

      // const recentLocations = localStorage.getItem("weather_recent_locations");

      // if (recentLocations) {
      //   localStorage.setItem(
      //     "weather_recent_locations",
      //     JSON.stringify([location, ...recentLocations].slice(0, 5))
      //   );
      // } else {
      //   localStorage.setItem(
      //     "weather_recent_locations",
      //     JSON.stringify([location])
      //   );
      // }
      return res.json();
    },
  });

  const fetchWeatherData = useMutation({
    mutationFn: async (location: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        const errBody = await res.json();
        throw {
          error: {
            message: errBody.error?.message || res.statusText,
            code: errBody.code,
          },
        };
      }

      // const recentLocations = localStorage.getItem("weather_recent_locations");

      // if (recentLocations) {
      //   localStorage.setItem(
      //     "weather_recent_locations",
      //     JSON.stringify([location, ...recentLocations].slice(0, 5))
      //   );
      // } else {
      //   localStorage.setItem(
      //     "weather_recent_locations",
      //     JSON.stringify([location])
      //   );
      // }
      return res.json();
    },
  });

  return query;
}
