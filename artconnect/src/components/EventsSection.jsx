// src/components/EventsSection.jsx (mise à jour)
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch((err) => console.error(err));
  }, []);

  const now = new Date();
  const upcoming = events
    .filter((e) => e.date && new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-8"><span className="text-[#d68727]">Événements</span> à venir</h2>

      {upcoming.length > 0 ? (
        <Swiper modules={[Navigation]} spaceBetween={20} navigation breakpoints={{320:{slidesPerView:1},640:{slidesPerView:2},1024:{slidesPerView:3}}}>
          {upcoming.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition">
                {event.image && <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />}
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date} — {event.location}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">Aucun événement à venir.</p>
      )}
    </section>
  );
};

export default EventsSection;
