// src/components/EventsSection.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  // Charger les événements depuis db.json
  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-8"><span className="text-[#d68727]">Événements</span> à venir</h2>

      {events.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 },   // Mobile → 1 carte
            640: { slidesPerView: 2 },   // Tablette → 2 cartes
            1024: { slidesPerView: 3 },  // Desktop → 3 cartes
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">Aucun événement trouvé.</p>
      )}
    </section>
  );
};

export default EventsSection;
