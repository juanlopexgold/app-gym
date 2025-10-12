import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState } from 'react'

// Importar páginas desde features
import LoginPage from '@/features/auth/pages/LoginPage'
import HomePage from '@/features/home/pages/HomePage'
import CronometroPage from '@/features/dashboard/pages/CronometroPage'
import IMCPage from '@/features/imc/pages/IMCPage'
import CalendarioPage from '@/features/calendario/pages/CalendarioPage'
import RutinasPage from '@/features/rutinas/pages/RutinasPage'

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
          isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />
        } 
      />

      {/* Login */}
      <Route 
        path="/login" 
        element={<LoginPage onLogin={handleLogin} />} 
      />

      {/* Nuevos módulos protegidos */}
      <Route 
        path="/cronometro" 
        element={isAuthenticated ? <CronometroPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/calendario" 
        element={isAuthenticated ? <CalendarioPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/imc" 
        element={isAuthenticated ? <IMCPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/rutinas" 
        element={isAuthenticated ? <RutinasPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}

export function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}
