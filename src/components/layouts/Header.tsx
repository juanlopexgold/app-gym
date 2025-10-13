import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Timer, Calendar, Activity, Dumbbell, Home as HomeIcon, LogOut, Menu, X, Sun, Moon, Download, Smartphone } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/hooks/useTheme"
import { usePWAInstall } from "@/hooks/usePWAInstall"
import IOSInstallGuide from "@/components/ui/IOSInstallGuide"

interface HeaderProps {
  onLogout?: () => void
}

export default function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { 
    isInstallable, 
    isInstalled, 
    isIOS, 
    showIOSGuide, 
    installApp, 
    showIOSInstallGuide, 
    hideIOSInstallGuide 
  } = usePWAInstall()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Timer className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">FitChrono</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link to="/cronometro" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
              <Timer className="h-4 w-4" />
              <span>Cronómetro</span>
            </Link>
            <Link to="/calendario" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Calendario</span>
            </Link>
            <Link to="/imc" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
              <Activity className="h-4 w-4" />
              <span>IMC</span>
            </Link>
            <Link to="/rutinas" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
              <Dumbbell className="h-4 w-4" />
              <span>Rutinas</span>
            </Link>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* PWA Install Button */}
            {!isInstalled && (isInstallable || isIOS) && (
              <Button
                variant="outline"
                size="sm"
                onClick={isIOS ? showIOSInstallGuide : installApp}
                className="flex items-center space-x-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Install app"
              >
                {isIOS ? (
                  <>
                    <Smartphone className="h-4 w-4" />
                    <span>Instalar</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Instalar</span>
                  </>
                )}
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="p-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            {/* Logout */}
            {onLogout && (
              <Button 
                variant="outline" 
                onClick={onLogout} 
                className="flex items-center space-x-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-slate-800 dark:text-slate-200" /> : <Menu className="h-6 w-6 text-slate-800 dark:text-slate-200" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="h-4 w-4" />
                <span>Inicio</span>
              </Link>
              <Link 
                to="/cronometro" 
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Timer className="h-4 w-4" />
                <span>Cronómetro</span>
              </Link>
              <Link 
                to="/calendario" 
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendario</span>
              </Link>
              <Link 
                to="/imc" 
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Activity className="h-4 w-4" />
                <span>IMC</span>
              </Link>
              <Link 
                to="/rutinas" 
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Dumbbell className="h-4 w-4" />
                <span>Rutinas</span>
              </Link>
              {/* Mobile PWA Install Button */}
              {!isInstalled && (isInstallable || isIOS) && (
                <Button
                  variant="outline"
                  onClick={isIOS ? showIOSInstallGuide : installApp}
                  className="flex items-center space-x-2 justify-start mt-4 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {isIOS ? (
                    <>
                      <Smartphone className="h-4 w-4" />
                      <span>Instalar App</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Instalar App</span>
                    </>
                  )}
                </Button>
              )}

              {/* Mobile Theme Toggle */}
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="flex items-center space-x-2 justify-start border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    <span>Modo Oscuro</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    <span>Modo Claro</span>
                  </>
                )}
              </Button>
              
              {/* Mobile Logout */}
              {onLogout && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onLogout()
                    setIsMenuOpen(false)
                  }} 
                  className="flex items-center space-x-2 justify-start border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* iOS Install Guide Modal */}
      <IOSInstallGuide 
        isOpen={showIOSGuide} 
        onClose={hideIOSInstallGuide} 
      />
    </header>
  )
}
