import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function HomePage() {
  // const { artworks } = useContext(AppContext);
  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredArtworks = artworks.filter(
  //   (art) => art.title && art.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // return (
  //   <div>
  //     <h1 className="text-2xl font-bold mb-4">Accueil</h1>
  //     <input
  //       type="text"
  //       placeholder="Rechercher une œuvre"
  //       value={searchTerm}
  //       onChange={(e) => setSearchTerm(e.target.value)}
  //       className="border p-2 rounded w-full mb-4"
  //     />

  //     <ul>
  //       {filteredArtworks.map((art, idx) => (
  //         <li key={idx} className="border p-2 rounded my-1">
  //           {art.title}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
