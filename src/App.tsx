import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Cronometro from './pages/Cronometro'
import Calendario from './pages/Calendario'
import IMC from './pages/IMC'
import Rutinas from './pages/Rutinas'

// Crear cliente de React Query
const queryClient = new QueryClient()

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  
  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate("/")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <Routes>
      {/* Ruta principal */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />
        } 
      />

      {/* Login */}
      <Route 
        path="/login" 
        element={<Login onLogin={handleLogin} />} 
      />

      {/* Nuevos módulos protegidos */}
      <Route 
        path="/cronometro" 
        element={isAuthenticated ? <Cronometro /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/calendario" 
        element={isAuthenticated ? <Calendario /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/imc" 
        element={isAuthenticated ? <IMC /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/rutinas" 
        element={isAuthenticated ? <Rutinas /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
