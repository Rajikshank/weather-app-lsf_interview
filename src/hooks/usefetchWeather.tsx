/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useGetWeatherForeCast(
  location: string
): UseQueryResult<any, Error> {
  const query = useQuery({
    queryKey: ["forecast", location],
    staleTime: 5 * 60 * 1000,

    queryFn: async () => {
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(
        location
      )}&days=7&aqi=no&alerts=no`;

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
