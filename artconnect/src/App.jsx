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
