import { useEffect, useState, useMemo } from "react";
import type { WeatherData, WeatherError } from "../../types";
import { useQuery } from "@tanstack/react-query";

export interface UseGetWeatherResult {
  data: WeatherData | null;
  error: WeatherError | null;
  isLoading: boolean;
}

export function useGetCurrentWeather(location: string): UseGetWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<WeatherError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = useMemo(() => {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    return `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(
      location
    )}&aqi=no`;
  }, [location]);

  useEffect(() => {
    if (!location) {
      setData(null);
      setError({ error: { message: "Location is required.", code: 400 } });
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchWeather() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          const errBody = await response.json();
          throw {
            error: {
              message: errBody.error?.message || response.statusText,
              code: errBody.code,
            },
          };
        }

        const result: WeatherData = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError(err as WeatherError);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [url, location]);

  return { data, error, isLoading };
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
