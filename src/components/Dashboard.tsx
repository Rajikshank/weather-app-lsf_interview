/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import {
  useGetCurrentWeather,
  useGetWeatherForeCast,
} from "../hooks/usefetchWeather";
import { Loader2 } from "lucide-react";
import LocationCard from "./LocationCard";
import { Card, CardContent, CardHeader } from "./ui/card";
import SearchBox from "./SearchBox";
import ForecastCard from "./ForcastCard";

const Dashboard = () => {
  const [location, setLocation] = useState<string>(
    () => localStorage.getItem("location") ?? "Colombo"
  );

  const [query, setLocationQuery] = useState(location);
  // const { data, error, isLoading } = useGetCurrentWeather(query);
  const { data, error, isLoading } = useGetWeatherForeCast(query);

  console.log("weather data ", data);
  return (
    <div className=" flex flex-col gap-2 justify-center items-center py-2 lg:px-8 lg:py-4 ">
      <Card className=" w-full bg-transparent border-none shadow-none ">
        <CardHeader>
          <SearchBox
            isloading={isLoading}
            location={location}
            setLocation={setLocation}
            setQuery={setLocationQuery}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="lg:grid-cols-3 grid gap-8">
            <div>
              <LocationCard
                isloading={isLoading}
                data={data!}
                currentLocation={query}
                location={location}
                setLocation={setLocation}
                setQuery={setLocationQuery}
              />
            </div>
            <div className="lg:col-span-2 ">
              <ForecastCard
                isloading={isLoading}
                data={data!}
                currentLocation={query}
                location={location}
                setLocation={setLocation}
                setQuery={setLocationQuery}
              />
            </div>
          </div>

          <div className="lg:grid-cols-3 grid gap-8">
            <div className="col-span-2">
              <ForecastCard
                isloading={isLoading}
                data={data!}
                currentLocation={query}
                location={location}
                setLocation={setLocation}
                setQuery={setLocationQuery}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
