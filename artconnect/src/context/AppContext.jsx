// src/context/AppContext.jsx
import { createContext, useState } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export function AppProvider({ children }) {
  const [artworks, setArtworks] = useState([]);

  // Ajouter une œuvre
  const addArtwork = (newArtwork) => {
    setArtworks((prev) => [newArtwork, ...prev]);
  };

  // Basculer le favori d'une œuvre
  const toggleFavorite = (artworkId) => {
    setArtworks((prev) =>
      prev.map((art) =>
        art.id === artworkId ? { ...art, favorite: !art.favorite } : art
      )
    );
  };

  return (
    <AppContext.Provider value={{ artworks, setArtworks, addArtwork, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}
