import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const PublishPage = () => {
  const { addArtwork } = useContext(AppContext); // <-- ici, à l'intérieur du composant
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    region: "",
    description: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categories = ["Artisanat", "Tapis", "Zellige", "Céramique", "Musique & Danse"];
  const regions = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Dakhla", "Ouarzazate"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.title || !formData.category || !formData.description || !formData.imageFile) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      setLoading(false);
      return;
    }

    try {
      // Simulation upload image
      const imageUrl = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("https://placehold.co/600x400/E9967A/FFFFFF?text=Oeuvre+Publiee");
        }, 1500);
      });

      const artworkData = {
        title: formData.title,
        category: formData.category,
        region: formData.region,
        description: formData.description,
        image: imageUrl,
        favorite: false,
        date: new Date().toISOString(),
      };

      // Ajouter au contexte global
      addArtwork(artworkData);

      // Réinitialiser le formulaire
      setSuccess(true);
      setFormData({
        title: "",
        category: "",
        region: "",
        description: "",
        imageFile: null,
      });
      const fileInput = document.getElementById("imageFile");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la publication. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2E2D1] flex flex-col items-center p-4 md:p-8 font-sans">
      {/* ... ton JSX du formulaire ... */}
      <form onSubmit={handleSubmit}>
        {/* ton formulaire */}
      </form>
    </div>
  );
};

export default PublishPage;
