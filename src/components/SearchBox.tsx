/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { Loader2, Search } from "lucide-react";

const SearchBox = ({
  location,
  isloading,
  setQuery,
  setLocation,
}: {
  location: string;
  isloading: boolean;
  setQuery: (arg: any) => void;
  setLocation: (arg: any) => void;
}) => {


  function handleSumit(e) {
    e.preventDefault();

    localStorage.setItem("location", location);
    setQuery(() => location);
  }
  return (
    <div className="flex items-center justify-center">
      <div className="outline rounded-full  p-1">
        <form
          className="focus:outline-1 flex  relative lg:min-w-xl px-2  min-w-3xs"
          onSubmit={handleSumit}
        >
          <input
            className="focus:outline-0 font-semibold  text-white  w-full"
            placeholder="Please Enter the city "
            onChange={(e) => setLocation(() => e.target.value)}
          />
          {isloading ? (
            <Loader2 className="size-6 animate-spin text-white" />
          ) : (
            <button className="cursor-pointer" type="submit">
            <Search  className="size-6  text-white " />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
