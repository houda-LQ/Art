import React from "react";
import { FaHeart } from "react-icons/fa";

const ArtworkCard = ({ art, onToggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 relative">
      <img
        src={art.image}
        alt={art.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{art.title}</h3>
      <p className="text-gray-500">{art.category}</p>

      {/* Icône favoris */}
      <button
        onClick={() => onToggleFavorite(art)}
        className="absolute top-2 right-2 text-red-500"
      >
        <FaHeart color={isFavorite ? "red" : "gray"} />
      </button>
    </div>
  );
};

export default ArtworkCard;
