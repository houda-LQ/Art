import React from "react";

const categories = [
  { name: "Tapis", img: "/tapi.jpeg" },
  { name: "Zellige", img: "/zellige1.jpeg" },
  { name: "Musique & Danse", img: "/Gnawa1.jpeg" },
  { name: "Céramique", img: "/ceram.jpeg" },
  { name: "Artisanat", img: "/art2.jpeg" }
];

const CategorySection = ({ onSelectCategory }) => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-2">Explorez par <span className="text-[#d68727]">catégorie</span></h2>
      <p className="text-gray-600 mb-8">
        Découvrez la diversité de l'artisanat marocain à travers nos différentes catégories
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center">
        {categories.map((cat) => (
          <div
  key={cat.name}
  onClick={() => onSelectCategory(cat.name)}
  className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
>
  <img src={cat.img} alt={cat.name} className="w-full h-32 object-cover" />
  <h3 className="py-2 font-semibold">{cat.name}</h3>
</div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
