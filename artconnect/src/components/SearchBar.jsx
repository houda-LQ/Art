import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Recherchez par mot-clé ou catégorie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-l-lg px-4 py-2 w-80 focus:outline-none"
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-r-lg">
        Rechercher
      </button>
    </form>
  );
}
