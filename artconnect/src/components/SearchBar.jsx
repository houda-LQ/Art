import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    onSearch(query);
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white shadow-lg rounded-xl p-4 flex w-[600px]">
        <input
          type="text"
          placeholder="Rechercher une oeuvre, artisan ou région..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border flex-1 rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="bg-[#C4302B] text-white px-6 py-2 rounded-r-lg hover:bg-red-700 transition"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
