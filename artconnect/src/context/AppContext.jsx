

import { createContext, useState } from "react";

// Création du contexte
export const AppContext = createContext();

// Fournisseur du contexte
export function AppProvider({ children }) {
  const [artworks, setArtworks] = useState([]);

  return (
    <AppContext.Provider value={{ artworks, setArtworks }}>
      {children}
    </AppContext.Provider>
  );
}

