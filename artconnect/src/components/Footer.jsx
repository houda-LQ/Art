import React from "react";
import logo from "../assets/logo.png"; // Vérifie le chemin
import { FaPaintBrush, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FCEAD7] text-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + description */}
        <div className="col-span-1 flex flex-col items-start">
          <img src={logo} alt="ArtConnect Logo" className="h-12 w-auto mb-3" />
          <p className="text-[#78716C] text-sm leading-relaxed">
            Préserver et promouvoir l'art et la culture marocaine à travers une
            plateforme moderne et accessible.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-bold text-black mb-2">Navigation</h3>
          <ul className="space-y-1 text-[#8716C] text-sm">
  <li><Link to="/">Accueil</Link></li>
  <li><Link to="/publier">Publier</Link></li>
  <li><Link to="/favoris">Favoris</Link></li>
</ul>
        </div>

        {/* À propos */}
        <div>
          <h3 className="font-bold text-black mb-2">À propos</h3>
          <ul className="space-y-1 text-[#8716C] text-sm">
            <li><a href="/mission">Mission</a></li>
            <li><a href="/valeurs">Valeurs</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Statistiques */}
        <div>
          <h3 className="font-bold text-black mb-2">Statistiques</h3>
          <ul className="space-y-2 text-[#8716C] text-sm">
            <li className="flex items-center">
              <FaPaintBrush className="text-[#C4302B] mr-2" /> +200 Œuvres
            </li>
            <li className="flex items-center">
              <FaUsers className="text-[#C4302B] mr-2" /> +50 Artisans
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-[#C4302B] mr-2" /> 12 Régions
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright simple */}
      <div className="border-t border-[#C4302B] text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} ArtConnect. Tous droits réservés.
      </div>
    </footer>
  );
}
