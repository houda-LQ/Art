// src/components/ArtisanOfMonth.jsx
import React, { useState, useEffect } from "react";

const ArtisanOfMonth = () => {
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.artisans) {
          const currentMonth = new Date().toISOString().slice(0, 7); // ex: "2025-09"
          const found = data.artisans.find((a) => a.month === currentMonth);
          if (found) setArtisan(found);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!artisan) {
    return (
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Artisan du mois</h2>
        <p className="text-gray-500">Aucun artisan sélectionné pour ce mois.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10"><span className="text-[#d68727]">Artisan</span> du mois</h2>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto transition hover:shadow-2xl">
        {/* Image */}
        <div className="md:w-1/2 relative">
          <img
            src={artisan.image}
            alt={artisan.name}
            className="w-full h-80 md:h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
             Sélection du mois
          </span>
        </div>

        {/* Infos artisan */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-3xl font-semibold text-gray-800 mb-3">
            {artisan.name}
          </h3>
          <p className="text-red-600 font-medium text-lg mb-4">
            {artisan.speciality}
          </p>
          <p className="text-gray-600 leading-relaxed">{artisan.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanOfMonth;
