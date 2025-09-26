// src/components/Form.jsx
import { useState, useEffect } from "react";

export default function AddOeuvreForm({ section, onSubmit, onCancel, initialData = {} }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [speciality, setSpeciality] = useState(""); // pour artisans
  const [lieu, setLieu] = useState(""); // pour événement
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || initialData.categorie || "");
      setDescription(initialData.description || initialData.bio || "");
      setSpeciality(initialData.speciality || "");
      setLieu(initialData.lieu || initialData.location || "");
      setDate(initialData.date || "");
      setImage(initialData.image || "");
    }
  }, [initialData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "artconnect_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/domqxzavm/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImage(data.secure_url);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const getEndpoint = (section) => {
    switch (section) {
      case "Œuvres": return "artworks";
      case "Catégories": return "categories";
      case "Artisans": return "artisans";
      case "Événements": return "events";
      default: return "artworks";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload selon section
    let payload = {};
    if (section === "Œuvres") payload = { title, category, description, lieu, date, image };
    else if (section === "Catégories") payload = { title: category, image };
    else if (section === "Artisans") payload = { title, speciality, description, image };
    else if (section === "Événements") payload = { title, date, image, lieu };

    const endpoint = getEndpoint(section);
    try {
      let saved;
      if (initialData && initialData.id) {
        const res = await fetch(`http://localhost:4000/${endpoint}/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        saved = await res.json();
      } else {
        const res = await fetch(`http://localhost:4000/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        saved = await res.json();
      }

      onSubmit(saved);
      setTitle(""); setCategory(""); setDescription("");
      setSpeciality(""); setLieu(""); setDate(""); setImage("");
    } catch (err) {
      console.error("Save error", err);
      alert("Erreur lors de la sauvegarde");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-xl space-y-3 w-96">
      <h2 className="text-lg font-bold">Ajouter / Modifier {section}</h2>

      {section === "Œuvres" && (
        <>
          <input type="text" placeholder="Titre de l’œuvre" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="text" placeholder="Catégorie" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-lg" rows={3}></textarea>
          <input type="text" placeholder="Lieu" value={lieu} onChange={e => setLieu(e.target.value)} className="w-full p-2 border rounded-lg" />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded-lg" />
        </>
      )}

      {section === "Catégories" && (
        <>
          <input type="text" placeholder="Nom de la catégorie" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded-lg" required />
        </>
      )}

      {section === "Artisans" && (
        <>
          <input type="text" placeholder="Nom de l’artisan" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="text" placeholder="Spécialité" value={speciality} onChange={e => setSpeciality(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <textarea placeholder="Description / bio" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-lg" rows={3}></textarea>
        </>
      )}

      {section === "Événements" && (
        <>
          <input type="text" placeholder="Titre de l’événement" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded-lg" required />
          <input type="text" placeholder="Lieu" value={lieu} onChange={e => setLieu(e.target.value)} className="w-full p-2 border rounded-lg" />
        </>
      )}

      <input type="file" onChange={handleImageUpload} className="w-full" />
      {image && <img src={image} alt="Preview" className="h-24 w-full object-cover rounded-md" />}

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">Ajouter</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500">Annuler</button>
      </div>
    </form>
  );
}
