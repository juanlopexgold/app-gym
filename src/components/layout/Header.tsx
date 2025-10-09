import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Timer, Calendar, Activity, Dumbbell, Home as HomeIcon, LogOut } from "lucide-react"

interface HeaderProps {
  onLogout?: () => void
}

export default function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Timer className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">FitChrono</h1>
        </div>

        {/* Menu */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-slate-700 hover:text-primary">
            <HomeIcon className="h-4 w-4" />
            <span>Inicio</span>
          </Link>
          <Link to="/cronometro" className="flex items-center space-x-1 text-slate-700 hover:text-primary">
            <Timer className="h-4 w-4" />
            <span>Cronómetro</span>
          </Link>
          <Link to="/calendario" className="flex items-center space-x-1 text-slate-700 hover:text-primary">
            <Calendar className="h-4 w-4" />
            <span>Calendario</span>
          </Link>
          <Link to="/imc" className="flex items-center space-x-1 text-slate-700 hover:text-primary">
            <Activity className="h-4 w-4" />
            <span>IMC</span>
          </Link>
          <Link to="/rutinas" className="flex items-center space-x-1 text-slate-700 hover:text-primary">
            <Dumbbell className="h-4 w-4" />
            <span>Rutinas</span>
          </Link>
        </nav>

        {/* Logout */}
        {onLogout && (
          <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Salir</span>
          </Button>
        )}
      </div>
    </header>
  )
}