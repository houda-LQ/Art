import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ac_favorites')) || []
    } catch {
      return []
    }
  })

  // charger catégories depuis API
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error('fetch categories error', err))
  }, [])

  // persister favoris
  useEffect(() => {
    localStorage.setItem('ac_favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = item => {
    setFavorites(prev => {
      if (prev.find(f => f.id === item.id)) return prev
      return [...prev, item]
    })
  }
  const removeFavorite = id => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }
  const isFavorite = id => favorites.some(f => f.id === id)

  return (
    <AppContext.Provider value={{
      categories,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
