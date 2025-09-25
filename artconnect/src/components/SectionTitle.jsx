// src/components/SectionTitle.jsx
import React from "react";
import { GiPaintBrush } from "react-icons/gi"; // nouveau pinceau
import { FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";

const SectionTitle = () => {
  return (
    <section className="text-center py-16 bg-gradient-to-b from-orange-50 to-beige-100">
      {/* Badge */}
      <span className="inline-block bg-red-100 text-[#C4302B] text-sm font-semibold px-4 py-1 rounded-full mb-6 shadow-sm">
        Votre plateforme culturelle
      </span>

      {/* Titre */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Découvrez l’art{" "}<br></br>
        <span className="text-[#CF6329]">Marocain Authentique</span>
      </h1>

      {/* Slogan */}
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
        Explorez les talents uniques et plongez dans la richesse culturelle et
        artistique du Maroc.
      </p>

      {/* Icônes avec texte */}
      <div className="flex justify-center gap-12 flex-wrap">
        {/* Œuvres */}
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-full p-6 text-[#C4302B] text-l hover:scale-110 transition-transform duration-300">
            <GiPaintBrush />
          </div>
          <p className="mt-3 text-gray-800 font-semibold">+200 Œuvres</p>
        </div>

        {/* Artisans */}
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-full p-6 text-[#C4302B] text-l hover:scale-110 transition-transform duration-300">
            <FaUserFriends />
          </div>
          <p className="mt-3 text-gray-800 font-semibold">+50 Artisans</p>
        </div>

        {/* Régions */}
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-full p-6 text-[#C4302B] text-l hover:scale-110 transition-transform duration-300">
            <FaMapMarkerAlt />
          </div>
          <p className="mt-3 text-gray-800 font-semibold">12 Régions</p>
        </div>
      </div>
    </section>
  );
};

export default SectionTitle;
