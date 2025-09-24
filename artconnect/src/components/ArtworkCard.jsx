import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ArtworkCard({ artwork }) {
  const { addToFavorites } = useContext(AppContext);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{artwork.title}</h3>
      <p className="text-[#948C85]">{artwork.city} - {artwork.category}</p>
      <button
        onClick={() => addToFavorites(artwork)}
        className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        ❤️ Ajouter aux favoris
      </button>
    </div>
  );
}
