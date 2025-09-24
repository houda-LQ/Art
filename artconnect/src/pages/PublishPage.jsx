import React, { useContext, useState } from "react"; // seulement useContext et useState
import { AppContext } from "../context/AppContext"; // AppContext vient de ton context

export default function PublishPage() {
  const { artworks, setArtworks } = useContext(AppContext);
  const [title, setTitle] = useState("");

  const handleAddArtwork = () => {
    if (title.trim() === "") return;
    setArtworks([...artworks, { title }]);
    setTitle("");
  };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Publier une œuvre</h1>
//       <input
//         type="text"
//         placeholder="Titre de l'œuvre"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border p-2 rounded mr-2"
//       />
//       <button
//         onClick={handleAddArtwork}
//         className="bg-[#C4302B] text-white px-4 py-2 rounded"
//       >
//         Ajouter
//       </button>

//       <ul className="mt-4">
//         {artworks.map((art, idx) => (
//           <li key={idx} className="border p-2 rounded my-1">
//             {art.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
}
