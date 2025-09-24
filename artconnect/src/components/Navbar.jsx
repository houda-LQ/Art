import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // ✅ récupère la route actuelle

  const links = [
    { name: "Accueil", path: "/" },
    { name: "Publier", path: "/publier" },
    { name: "Favoris", path: "/favoris" },
    { name: "À propos", path: "/a-propos" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-white/60 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/">
            <img src={logo} alt="ArtConnect Logo" className="h-13 w-auto" />
          </Link>

          {/* Liens desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-medium rounded-full transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-[#C4302B] text-white shadow-md scale-105"
                    : "text-[#948C85] hover:text-[#C4302B] hover:bg-[#C4302B]/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {open && (
          <div className="md:hidden px-6 pb-4 flex flex-col space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-[#C4302B] text-white shadow-md scale-105"
                    : "text-gray-800 hover:text-[#C4302B] hover:bg-[#C4302B]/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
