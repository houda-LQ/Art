// src/components/SectionManager.jsx
import React, { useState } from "react";
import Form from "./Form";

function SectionManager({ section, items = [], onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const getEndpoint = (section) => {
    switch (section) {
      case "Œuvres":
        return "artworks";
      case "Événements":
        return "events";
      case "Artisans":
        return "artisans";
      case "Catégories":
        return "categories";
      default:
        return "artworks";
    }
  };

  // appelé par Form après POST ou PUT (savedItem vient de l'API)
  const handleFormSubmit = (savedItem) => {
    if (editIndex !== null) {
      const updated = items.map((it) => (it.id === savedItem.id ? savedItem : it));
      onUpdate(updated);
    } else {
      onUpdate([...items, savedItem]);
    }
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const endpoint = getEndpoint(section);
      await fetch(`http://localhost:4000/${endpoint}/${id}`, { method: "DELETE" });
      onUpdate(items.filter((it) => it.id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex gap-2 mb-4">
        <button className="bg-[#C4302B] text-white px-4 py-2 rounded" onClick={() => setShowForm(!showForm)}>
          {editIndex !== null ? "Modifier" : "Ajouter"}
        </button>
        {showForm && (
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditIndex(null); }}>
            Annuler
          </button>
        )}
      </div>

      {showForm && (
        <Form
          section={section}
          onSubmit={handleFormSubmit}
          initialData={editIndex !== null ? items[editIndex] : {}}
          onCancel={() => { setShowForm(false); setEditIndex(null); }}
        />
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={item.id ?? index} className="bg-[#FBE8E6] p-3 rounded-lg shadow-md flex flex-col items-center">
            {item.image && <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />}

            <span className="font-semibold">{item.title}</span>
            <p className="text-sm text-gray-600">{item.category || item.categorie}</p>

            <div className="flex gap-2 mt-2">
              <button className="text-blue-500 font-semibold" onClick={() => handleEdit(index)}>
                Modifier
              </button>
              <button className="text-red-500 font-semibold" onClick={() => handleDelete(item.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionManager;
