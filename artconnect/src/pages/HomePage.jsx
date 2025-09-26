// src/pages/HomePage.jsx (petits changements)
import React, { useState, useEffect, useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import CategorySection from "../components/CategorySection";
import SearchBar from "../components/SearchBar";
import ArtworkCard from "../components/ArtworkCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import EventsSection from "../components/EventsSection";
import ArtisanOfMonth from "../components/ArtisanOfMonth";




const HomePage = () => {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [events, setEvents] = useState([]);
   const [artisanOfMonth, setArtisanOfMonth] = useState(null);

// HomePage.jsx
useEffect(() => {
  // Artworks
  fetch("http://localhost:4000/artworks")
    .then((res) => res.json())
    .then((data) => setAllArtworks(data || []))
    .catch((err) => console.error(err));
  
  // Events
  fetch("http://localhost:4000/events")
    .then((res) => res.json())
    .then((data) => setEvents(data || []))
    .catch((err) => console.error(err));

  // Artisan du mois
  fetch("http://localhost:4000/artisans")
    .then((res) => res.json())
    .then((data) => setArtisanOfMonth(data || []))
    .catch((err) => console.error(err));
}, []);

  

  const categories = useMemo(() => {
    return Array.from(new Set(allArtworks.map(a => a.category || a.categorie || "").filter(Boolean)));
  }, [allArtworks]);

  const handleSelectCategory = (category) => {
    const filtered = allArtworks.filter(
      (art) => (art.category || art.categorie || "").toLowerCase() === category.toLowerCase()
    );
    setFilteredResults(filtered);
  };

  const handleSearch = (query) => {
    const filtered = allArtworks.filter(
      (art) =>
        (art.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (art.category || art.categorie || "").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };
  
  const toggleFavorite = async (artwork) => {
  const updated = { ...artwork, favorite: !artwork.favorite };

  // Mise à jour locale (state React)
  setAllArtworks((prev) =>
    prev.map((a) => (a.id === artwork.id ? updated : a))
  );

  // Mise à jour côté serveur (json-server)
  try {
    await fetch(`http://localhost:4000/artworks/${artwork.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du favori", err);
  }
};


  return (
    <div>
      <SectionTitle />
      <CategorySection categories={categories} onSelectCategory={handleSelectCategory} />
      <SearchBar onSearch={handleSearch} />

      {filteredResults.length > 0 && (
        <section className="py-16 px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Résultats</h2>
          <Swiper modules={[Navigation]} spaceBetween={20} slidesPerView={3} navigation>
            {filteredResults.map((art) => (
             <SwiperSlide key={art.id}>
             <ArtworkCard
              art={art}
              onToggleFavorite={toggleFavorite}
              isFavorite={art.favorite}
  />
</SwiperSlide>

            ))}
          </Swiper>
        </section>
      )}

      <EventsSection />
      <ArtisanOfMonth />
    </div>
  );
};

export default HomePage;
