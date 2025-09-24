// import React from "react";
// import Navbar from "./components/Navbar";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       {/* espace pour que le contenu ne soit pas caché par la navbar fixed */}
//       <main className="pt-20">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl font-semibold mt-8">Page de test</h1>
//           <p className="mt-4 text-gray-700">
//             La navbar doit être sticky, transparente avec effet blur. Vérifie en réduisant la fenêtre pour voir le menu mobile.
//           </p>
//         </div>
//       </main>
//     </>
//   );
// }
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import { AppProvider } from "./context/AppContext";

// import HomePage from "./pages/HomePage";
// import PublishPage from "./pages/PublishPage";

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/publish" element={<PublishPage />} />
//         </Routes>
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PublishPage from "./pages/PublishPage";
import FavoritesPage from "./pages/FavoritesPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from "./pages/AboutPage";
import { AppProvider } from "./context/AppContext"; 

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />

        <main className="pt-20 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publier" element={<PublishPage />} />
            <Route path="/favoris" element={<FavoritesPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
