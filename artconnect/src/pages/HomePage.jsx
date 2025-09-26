import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext"; // <-- utiliser AppContext maintenant
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
  const { artworks, setArtworks, toggleFavorite } = useContext(AppContext); // <-- AppContext
  const [filteredResults, setFilteredResults] = useState([]);
  const [events, setEvents] = useState([]);
  const [artisanOfMonth, setArtisanOfMonth] = useState(null);

  useEffect(() => {
    if (artworks.length === 0) {
      fetch("http://localhost:4000/artworks")
        .then((res) => res.json())
        .then((data) => setArtworks(data || []))
        .catch((err) => console.error(err));
    }

    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch((err) => console.error(err));

    fetch("http://localhost:4000/artisans")
      .then((res) => res.json())
      .then((data) => setArtisanOfMonth(data || []))
      .catch((err) => console.error(err));
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(artworks.map(a => a.category || a.categorie || "").filter(Boolean)));
  }, [artworks]);

  const handleSelectCategory = (category) => {
    const filtered = artworks.filter(
      (art) => (art.category || art.categorie || "").toLowerCase() === category.toLowerCase()
    );
    setFilteredResults(filtered);
  };

  const handleSearch = (query) => {
    const filtered = artworks.filter(
      (art) =>
        (art.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (art.category || art.categorie || "").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div>
      <SectionTitle />
      <CategorySection categories={categories} onSelectCategory={handleSelectCategory} />
      <SearchBar onSearch={handleSearch} />

      {(filteredResults.length > 0 ? filteredResults : artworks).length > 0 && (
        <section className="py-16 px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Résultats</h2>
          <Swiper modules={[Navigation]} spaceBetween={20} slidesPerView={3} navigation>
            {(filteredResults.length > 0 ? filteredResults : artworks).map((art) => (
              <SwiperSlide key={art.id}>
                <ArtworkCard
                  art={art}
                  onToggleFavorite={() => toggleFavorite(art.id)} // <-- toggle via contexte
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
