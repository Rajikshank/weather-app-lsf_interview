/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { useGetCurrentWeather } from "../hooks/UsefetchWeather";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [location, setLocation] = useState<string>(() => localStorage.getItem("location") ?? "Colombo");
  const [query, setLocationQuery] = useState(location);
  const { data, error, isLoading } = useGetCurrentWeather(query);

  console.log("weather data ",data)
  return (
    <div className=" flex justify-center items-center py-2  ">
      <div className="  ">
        <input
          type="text"
          placeholder="Enter your location"
          onChange={(e) => setLocation(() => e.target.value)}
        />

        <button
          onClick={() => {
            localStorage.setItem("location",location)
            setLocationQuery(() => location);
          }}
          className="bg-yellow-300 mx-2 rounded-md p-2"
        >
          Get weather
        </button>
      </div>

      <div>
        {isLoading && <div > <Loader2 className="text-white size-10 animate-spin"/> </div>}
        <p>
          {data?.current && !isLoading
            ? data.current.condition.text
            : "no data found"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
