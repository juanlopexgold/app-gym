import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState, lazy, Suspense } from 'react'

// Importar páginas principales (no lazy)
import LoginPage from '@/features/auth/pages/LoginPage'
import HomePage from '@/features/home/pages/HomePage'

// Lazy loading para páginas secundarias
const CronometroPage = lazy(() => import('@/features/dashboard/pages/CronometroPage'))
const IMCPage = lazy(() => import('@/features/imc/pages/IMCPage'))
const CalendarioPage = lazy(() => import('@/features/calendario/pages/CalendarioPage'))
const RutinasPage = lazy(() => import('@/features/rutinas/pages/RutinasPage'))

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

      {/* Nuevos módulos protegidos con lazy loading */}
      <Route 
        path="/cronometro" 
        element={
          isAuthenticated ? (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Cargando cronómetro...</div></div>}>
              <CronometroPage />
            </Suspense>
          ) : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/calendario" 
        element={
          isAuthenticated ? (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Cargando calendario...</div></div>}>
              <CalendarioPage />
            </Suspense>
          ) : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/imc" 
        element={
          isAuthenticated ? (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Cargando IMC...</div></div>}>
              <IMCPage />
            </Suspense>
          ) : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/rutinas" 
        element={
          isAuthenticated ? (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg">Cargando rutinas...</div></div>}>
              <RutinasPage />
            </Suspense>
          ) : <Navigate to="/login" />
        } 
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
