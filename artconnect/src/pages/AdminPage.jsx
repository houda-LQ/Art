// src/pages/AdminPage.jsx
import React, { useState, useEffect } from "react";
import SectionManager from "../components/SectionManager";

function AdminPage() {
  const sections = ["Œuvres", "Catégories", "Artisans", "Événements"];
  const [activeSection, setActiveSection] = useState(null);

  const [data, setData] = useState({
    "Œuvres": [],
    "Catégories": [],
    "Artisans": [],
    "Événements": []
  });

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [artsRes, eventsRes, artisansRes] = await Promise.all([
          fetch("http://localhost:4000/artworks"),
          fetch("http://localhost:4000/events"),
          fetch("http://localhost:4000/artisans")
        ]);
        const [arts, evts, artsns] = await Promise.all([artsRes.json(), eventsRes.json(), artisansRes.json()]);

        // catégories dérivées depuis artworks
        const uniqueCats = Array.from(new Set((arts || []).map(a => a.category || a.categorie || "").filter(Boolean)));
        const cats = uniqueCats.map((c, i) => ({ id: i + 1, title: c, category: c }));

        setData({
          "Œuvres": arts || [],
          "Catégories": cats,
          "Artisans": artsns || [],
          "Événements": evts || []
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadAll();
  }, []);

  const handleUpdate = (section, items) => {
    setData({ ...data, [section]: items });
  };

  return (
    <div className="p-6 bg-[#fdf6f0] min-h-screen">
      <h1 className="text-4xl font-bold text-[#C4302B] text-center mb-2">Tableau de bord Admin</h1>
      <p className="text-center text-gray-700 mb-6">Gérez les œuvres, catégories, artisans et événements</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {sections.map((section) => {
          const isActive = activeSection === section;
          return (
            <div key={section} className={`shadow-md rounded-lg p-6 text-center cursor-pointer transition-transform ${isActive ? "bg-[#C4302B] text-white scale-105" : "bg-white hover:scale-105 hover:bg-[#FBE8E6]"}`}
              onClick={() => setActiveSection(isActive ? null : section)}>
              <h2 className="text-xl font-semibold">{section}</h2>
            </div>
          );
        })}
      </div>

      {activeSection && (
        <SectionManager
          section={activeSection}
          items={data[activeSection] || []}
          onUpdate={(items) => handleUpdate(activeSection, items)}
        />
      )}
    </div>
  );
}

export default AdminPage;
