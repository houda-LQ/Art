// src/components/ArtisanOfMonth.jsx
import React, { useEffect, useState } from "react";

const ArtisanOfMonth = () => {
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:4000/artisans");
        const data = await res.json();
        const now = new Date();
        const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
        const found = (data || []).find(a => a.month === ym);
        setArtisan(found || null);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  if (!artisan) return null;

  return (
    <section className="py-12 px-4 ">
      <h2 className="text-4xl font-bold mb-8 text-center"><span className="text-[#d68727]">Artisan</span> du mois</h2>

      <div className="bg-white p-4 rounded shadow-md flex items-center gap-4">
        {artisan.image && <img src={artisan.image} alt={artisan.name} className="w-28 h-28 object-cover rounded-md" />}
        <div>
          <h3 className="text-xl font-semibold">{artisan.name}</h3>
          <p className="text-gray-600">{artisan.speciality}</p>
          <p className="text-gray-700 mt-2">{artisan.bio}</p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanOfMonth;
