// src/pages/PublishPage.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const PublishPage = () => {
  const { addArtwork } = useContext(AppContext); // ✅ contexte utilisé ici

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
  };

  // Simulate Cloudinary upload
  const uploadImageToCloudinary = async (file) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("https://placehold.co/600x400/E9967A/FFFFFF?text=Oeuvre+Publiee");
      }, 1000);
    });
  };

  // POST to JSON server
  const publishArtwork = async (artworkData) => {
    const res = await fetch("http://localhost:4000/artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artworkData),
    });
    if (!res.ok) throw new Error("Failed to publish artwork");
    return await res.json();
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
      const imageUrl = await uploadImageToCloudinary(formData.imageFile);

      const artworkData = {
        title: formData.title,
        category: formData.category,
        region: formData.region,
        description: formData.description,
        image: imageUrl,
        favorite: false,
        date: new Date().toISOString(),
      };

      // Ajouter au contexte global pour que HomePage se mette à jour automatiquement
      addArtwork(artworkData);

      // Envoyer au JSON server
      await publishArtwork(artworkData);

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
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-red-800 pb-2 text-center">Publier une œuvre</h1>
        <p className="text-gray-600 text-center mb-6">
          Partagez votre contribution culturelle et enrichissez ArtConnect Maroc.
        </p>

        {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">Votre œuvre a été publiée !</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-lg shadow-xl space-y-6 border border-gray-200">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre de l'œuvre <span className="text-red-500">*</span>
            </label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Ex: Tapis berbère d'Azilal" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border bg-[#FEEFDE]" />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border bg-[#FEEFDE]">
              <option value="" disabled>Sélectionner une catégorie</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Ville ou Région</label>
            <select name="region" id="region" value={formData.region} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border bg-[#FEEFDE]">
              <option value="">Sélectionner une ville</option>
              {regions.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Décrivez l'œuvre, son histoire, ses matériaux..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border bg-[#FEEFDE]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo de l'œuvre <span className="text-red-500">*</span></label>
            <input id="imageFile" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-red-600 file:text-white hover:file:bg-red-700" />
            {formData.imageFile && <p className="mt-2 text-xs text-gray-500">Fichier : {formData.imageFile.name}</p>}
          </div>

          <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-md text-white bg-red-700 hover:bg-red-800 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {loading ? "Publication en cours..." : "Publier l'œuvre"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
