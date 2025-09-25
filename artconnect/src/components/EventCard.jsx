import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-600">{event.location}</p>
        <p className="text-sm text-gray-500"> {event.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
