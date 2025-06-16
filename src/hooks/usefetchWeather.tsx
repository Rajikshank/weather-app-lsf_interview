import {  useMemo } from "react";
import type { WeatherData,  } from "../../types";
import { useQuery } from "@tanstack/react-query";

export interface UseGetWeatherResult {
  data: WeatherData | null;
  error: unknown;
  isLoading: boolean;
}



export function useGetWeatherForeCast(location: string) {
  const url = useMemo(() => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    return `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(
      location
    )}&days=7&aqi=no&alerts=no`;
  }, [location]);

  // const queryClient = useQueryClient();

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
      return res.json();
    },
  
  });

  return query;
}
