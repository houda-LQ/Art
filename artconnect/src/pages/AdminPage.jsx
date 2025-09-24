import { AppContext } from "../context/AppContext";
import React from "react";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#C4302B] mb-6">Espace Admin</h1>
      <p className="text-gray-700 leading-relaxed">
        Ici, les administrateurs peuvent gérer les œuvres, les utilisateurs et les
        statistiques de la plateforme.
      </p>
    </div>
  );
}
