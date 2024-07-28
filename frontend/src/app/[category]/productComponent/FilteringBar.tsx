'use client';
import React, { useState } from "react";

interface FilterBarProps {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    minPrice: string;
    setMinPrice: React.Dispatch<React.SetStateAction<string>>;
    maxPrice: string;
    setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  }
  

const FilterBar: React.FC<FilterBarProps> = ({ sortBy, setSortBy, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleApplyFilter = () => {
    const min = minPrice !== "" ? parseInt(minPrice) : undefined;
    const max = maxPrice !== "" ? parseInt(maxPrice) : undefined;

    if (min !== undefined && max !== undefined && min > max) {
      setError("Min price cannot be larger than max price");
      setMinPrice("");
      setMaxPrice("");
      console.error("Error: Min price cannot be larger than max price");
      return;
    }

    setError(null);
    console.log("Filtering with min:", min, "and max:", max);
  };

  const handleClearFilter = () => {
    setMinPrice("0");
    setMaxPrice("1000");
    setError(null);
    console.log("Clearing filters");
  };

  return (
    <div className="filterBar w-[90%] bg-neutral h-20 mx-auto mb-32 flex items-center px-10 gap-2 xl:gap-10 justify-center">
      <span className="font-semibold text-xl text-base-100">Filter by</span>

      <div
        className={`p-1 font-semibold text-xl bg-base-100 text-base-content h-3/4 xl:w-1/12 min-w-1/12 flex items-center justify-center cursor-pointer ${
          sortBy === "latest" ? "bg-secondary" : "bg-base-100"
        }`}
        onClick={() => setSortBy("latest")}
      >
        Latest
      </div>

      <div
        className={`p-1 font-semibold text-xl bg-base-100 text-base-content h-3/4 xl:w-1/12 min-w-1/12 flex items-center justify-center cursor-pointer ${
          sortBy === "bestselling" ? "bg-secondary" : "bg-base-100"
        }`}
        onClick={() => setSortBy("bestselling")}
      >
        Bestselling
      </div>

      <div
        className={`p-1 font-semibold text-xl bg-base-100 text-base-content h-3/4 xl:w-1/12 min-w-1/12 flex items-center justify-center cursor-pointer ${
          sortBy === "max" ? "bg-secondary" : "bg-base-100"
        }`}
        onClick={() => setSortBy("max")}
      >
        High to low
      </div>

      <div
        className={` font-semibold text-xl bg-base-100 text-base-content h-3/4 xl:w-1/12 min-w-1/12 flex items-center justify-center cursor-pointer ${
          sortBy === "min" ? "bg-secondary" : "bg-base-100"
        }`}
        onClick={() => setSortBy("min")}
      >
        Low to high
      </div>

      <div className="items-center xl:space-x-4 space-x-2 ustify-between w-1/2 hidden md:flex justify-end">
        <span className="font-semibold text-xl text-base-100 hidden xl:inline">From:</span>
        <input
          type="text"
          placeholder={minPrice === "0" ? "''" : "..."}
          value={minPrice}
          onChange={handleMinPriceChange}
          className="xl:w-28 w-20 h-14 px-3 bg-base-100 outline-none text-xl text-base-content font-semibold"
        />
        <span className="font-semibold text-xl text-base-100">to</span>
        <input
          type="text"
          placeholder="..."
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="xl:w-28 w-20 h-14 px-3 bg-base-100 outline-none text-xl text-base-content font-semibold"
        />

        <button
          onClick={handleClearFilter}
          className="px-4 py-2 w-36 h-14 bg-red-500 shadow-md hover:bg-accent text-xl text-base-100 font-semibold hidden xl:inline"
        >
          Cancel
        </button>
        <button
          onClick={handleClearFilter}
          className="px-4 py-2 w-14 h-14 bg-red-500 shadow-md hover:bg-accent text-xl text-base-100 font-semibold xl:hidden"
        >
          X
        </button>
      </div>

      {error && <div className="text-red-500 text-xl mt-2">{error}</div>}
    </div>
  );
};

export default FilterBar;
