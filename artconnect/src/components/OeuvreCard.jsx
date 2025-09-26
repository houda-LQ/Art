// OeuvreCard.jsx
import { FaMapMarkerAlt, FaCalendarAlt, FaHeart } from "react-icons/fa";
import { useState } from "react";

export default function OeuvreCard({ oeuvre, onDelete, onEdit, onFavoriteToggle }) {
  // état local pour la couleur du cœur
  const [isFavorite, setIsFavorite] = useState(oeuvre.favorite || false);

  const handleFavorite = async () => {
    const newFav = !isFavorite;
    setIsFavorite(newFav);

    // si tu veux sauvegarder côté json-server
    if (onFavoriteToggle) {
      await onFavoriteToggle({ ...oeuvre, favorite: newFav });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative">
      {oeuvre.image && (
        <img src={oeuvre.image} alt={oeuvre.title} className="h-40 w-full object-cover" />
      )}

      {/* Badge catégorie */}
      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {oeuvre.category || oeuvre.categorie}
      </span>

      {/* Bouton favori */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 text-2xl transition"
        style={{ color: isFavorite ? "red" : "white" }}
      >
        <FaHeart />
      </button>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{oeuvre.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{oeuvre.description}</p>

        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{oeuvre.lieu}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-red-500" />
            <span>{oeuvre.date}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onEdit(oeuvre)}
            className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition"
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(oeuvre.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
