import React, { useState, useEffect, createContext, useContext } from "react";
import { FaHeart, FaTag, FaTimes } from "react-icons/fa";

// -----------------------------
// 🔹 Context
// -----------------------------
export const ArtConnectContext = createContext({
  favorites: [],
  removeFromFavorites: () => {},
});

const ArtConnectProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/db.json") // Assure-toi que db.json est dans /public
      .then((res) => res.json())
      .then((data) => {
        // Filtrer les œuvres où favorite === true
        const favs = data.artworks.filter((item) => item.favorite);
        setFavorites(favs);
      })
      .catch((err) => console.error("Erreur lecture db.json :", err));
  }, []);

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const contextValue = { favorites, removeFromFavorites };

  return (
    <ArtConnectContext.Provider value={contextValue}>
      {children}
    </ArtConnectContext.Provider>
  );
};

// -----------------------------
// 🔹 Carte Œuvre Favoris
// -----------------------------
const FavoriteCard = ({ oeuvre, onRemove }) => (
  <div className="relative bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="absolute top-3 right-3 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-200 z-10 opacity-90 hover:scale-110"
      title="Retirer des favoris"
    >
      <FaTimes className="w-4 h-4" />
    </button>
    <img
      src={oeuvre.image}
      alt={oeuvre.title}
      className="w-full h-48 object-cover object-center"
      onError={(e) => {
        e.target.src =
          "https://placehold.co/400x300/dddddd/333333?text=Image+Manquante";
      }}
    />
    <div className="p-4 flex flex-col justify-between h-32">
      <h3 className="text-lg font-extrabold text-[#964B00] mb-2 leading-tight line-clamp-2">
        {oeuvre.title}
      </h3>
      <div className="space-y-1 text-sm text-gray-600">
        <p className="flex items-center">
          <FaTag className="w-4 h-4 mr-2 text-[#B8860B]" />
          <span className="font-medium">{oeuvre.category}</span>
        </p>
      </div>
    </div>
  </div>
);

// -----------------------------
// 🔹 Page Favoris
// -----------------------------
const FavorisContent = () => {
  const { favorites, removeFromFavorites } = useContext(ArtConnectContext);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F2E2D1] font-[Inter] pt-16 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="block w-fit mx-auto bg-[#F24822] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-sm">
          COLLECTION PERSONNELLE
        </span>

        <h1 className="text-4xl font-extrabold text-gray-900 border-b-2 border-[#964B00]/50 pb-1 inline-block">
          Mes Favoris
        </h1>

        <p className="text-base text-gray-700 mt-2 max-w-lg mx-auto">
          Retrouvez toutes les œuvres et traditions que vous avez sauvegardées
          dans votre collection personnelle.
        </p>
      </div>

      {/* Content */}
      <div className="w-full max-w-lg md:max-w-xl bg-white rounded-xl p-8 sm:p-12 border border-gray-200">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-8 pb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
              Aucun favori pour l'instant
            </h3>
            <p className="text-center text-gray-500 mb-6 max-w-sm text-sm">
              Commencez à explorer et ajoutez vos œuvres préférées à vos favoris
              en cliquant sur le cœur.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {favorites.map((oeuvre) => (
              <FavoriteCard
                key={oeuvre.id}
                oeuvre={oeuvre}
                onRemove={() => removeFromFavorites(oeuvre.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// -----------------------------
// 🔹 Export de la Page
// -----------------------------
const FavoritePage = () => (
  <ArtConnectProvider>
    <FavorisContent />
  </ArtConnectProvider>
);

export default FavoritePage;


