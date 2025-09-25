import React, { useState, useEffect } from "react";
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

  // Charger uniquement les œuvres
  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => setAllArtworks(data.artworks || [])) // 👈 ici artworks
      .catch((err) => console.error(err));
  }, []);

  // Quand l'utilisateur clique sur une catégorie
  const handleSelectCategory = (category) => {
    const filtered = allArtworks.filter(
      (art) => art.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredResults(filtered);
  };

  // Quand l'utilisateur fait une recherche
  const handleSearch = (query) => {
    const filtered = allArtworks.filter(
      (art) =>
        art.title.toLowerCase().includes(query.toLowerCase()) ||
        art.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div>
      <SectionTitle />

      {/* Catégories */}
      <CategorySection onSelectCategory={handleSelectCategory} />

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Carrousel uniquement si filteredResults n'est pas vide */}
      {filteredResults.length > 0 && (
        <section className="py-16 px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Résultats</h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
          >
            {filteredResults.map((art) => (
              <SwiperSlide key={art.id}>
                <ArtworkCard art={art} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Section événements */}
      <EventsSection />
            <ArtisanOfMonth />

    </div>
  );
};

export default HomePage;
