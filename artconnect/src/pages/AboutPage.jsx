import React from "react";
import { useNavigate } from "react-router-dom";

// Icônes depuis react-icons
import { FaGlobe, FaShareAlt, FaUsers, FaHeart, FaPaintBrush, FaHammer, FaBuilding, FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#F2E2D1" }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-400 text-white py-16 px-4 md:px-20 text-center md:text-left pt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-center font-bold mb-2">
            À propos d'ArtConnect Maroc
          </h1>
          <p className="text-xl text-center opacity-90 max-w-2xl mx-auto">
            Une plateforme dédiée à la promotion et à la préservation de l'art et de la culture marocaine
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Mission */}
        <section className="mb-16">
          <div className="bg-[#FEEFDE] p-8 rounded-lg shadow-xl border-t-4 border-red-800">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Mission</h2>
            <p className="text-gray-600 mb-4">
              ArtConnect Maroc a pour objectif de <b>créer un espace pour préserver, promouvoir et connecter</b> les passionnés d'art, artisans et amateurs de culture. Nous croyons que le patrimoine est vivant et mérite d'être partagé.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-[#FEEFDE] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Vision</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { title: "Explorer la culture", icon: <FaGlobe className="text-red-800 h-10 w-10 mx-auto mb-4" />, desc: "Découvrez l'artisanat, l'histoire, et les traditions..." },
                { title: "Partager son savoir", icon: <FaShareAlt className="text-red-800 h-10 w-10 mx-auto mb-4" />, desc: "Publiez vos œuvres ou traditions pour enrichir..." },
                { title: "S'engager en réseau", icon: <FaUsers className="text-red-800 h-10 w-10 mx-auto mb-4" />, desc: "Rencontrez et échangez avec des artisans..." },
                { title: "Ajouter aux favoris", icon: <FaHeart className="text-red-800 h-10 w-10 mx-auto mb-4" />, desc: "Soutenez et valorisez les œuvres et traditions..." },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4">
                  {item.icon}
                  <h3 className="font-semibold text-lg mt-3 mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">ArtConnect Maroc, c'est...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { count: "+ 200", label: "Traditions référencées", icon: <FaPaintBrush className="text-red-800 w-12 h-12 mx-auto mb-2" /> },
              { count: "+ 50", label: "Artisans inscrits", icon: <FaHammer className="text-red-800 w-12 h-12 mx-auto mb-2" /> },
              { count: "+ 300", label: "Membres de la communauté", icon: <FaUsers className="text-red-800 w-12 h-12 mx-auto mb-2" /> },
              { count: "4", label: "Partenaires officiels", icon: <FaBuilding className="text-red-800 w-12 h-12 mx-auto mb-2" /> },
            ].map((stat, index) => (
              <div key={index} className="bg-[#FEEFDE] p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
                <span className="mb-2">{stat.icon}</span>
                <p className="text-4xl font-extrabold text-gray-800">{stat.count}</p>
                <p className="text-sm mt-1 text-gray-600 text-center">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-16">
          <div className="bg-[#FEEFDE] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Authenticité", icon: <FaHandshake className="text-red-800 w-10 h-10" />, desc: "Mettre en avant un contenu vrai, fidèle au patrimoine." },
                { title: "Innovation", icon: <FaLightbulb className="text-red-800 w-10 h-10" />, desc: "Utiliser la technologie pour revitaliser la tradition." },
                { title: "Respect", icon: <FaShieldAlt className="text-red-800 w-10 h-10" />, desc: "Assurer un espace respectueux pour tous les artistes." },
              ].map((value, index) => (
                <div key={index} className="bg-[#FEEFDE] p-6 rounded-xl shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-red-100 rounded-full flex-shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 mt-1">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-gradient-to-r from-red-600 to-orange-400 text-white p-10 rounded-xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">Rejoignez notre communauté</h2>
          <p className="text-lg mb-6 opacity-90">Contribuez à la richesse et à la vitalité du patrimoine culturel.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-red-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Explorer les oeuvres
            </button>
            <button
              style={{ backgroundColor: "#FDCB01" }}
              className="text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg hover:brightness-90 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/publier")}
            >
              Publier une oeuvre
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
