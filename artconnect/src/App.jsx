import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Publish from './pages/Publish'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}
