import { AppContext } from "../context/AppContext";
import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#C4302B] mb-6">À propos</h1>
      <p className="text-gray-700 leading-relaxed">
        Bienvenue sur ArtConnect ! <br />
        Notre mission est de préserver et promouvoir l’art et la culture
        marocaine à travers une plateforme moderne et accessible.
      </p>
    </div>
  );
}
