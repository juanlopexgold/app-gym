import { useState } from "react"
import { Layout } from "@/components/layouts/Layout"
import Calendar from "../components/Calendar"
import WorkoutStats from "../components/WorkoutStats"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar as CalendarIcon } from "lucide-react"

export default function CalendarioPage() {
  const [currentView, setCurrentView] = useState<"calendar" | "stats">("calendar")
  const [currentDate] = useState(new Date())

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              📅 Calendario de Entrenamientos
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
              Registra tus entrenamientos y revisa tu progreso
            </p>
          </div>
          
          {/* Botones de vista */}
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button
              onClick={() => setCurrentView("calendar")}
              variant={currentView === "calendar" ? "default" : "outline"}
              className="flex items-center space-x-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Calendario</span>
            </Button>
            <Button
              onClick={() => setCurrentView("stats")}
              variant={currentView === "stats" ? "default" : "outline"}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Estadísticas</span>
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        {currentView === "calendar" ? (
          <Calendar />
        ) : (
          <WorkoutStats 
            year={currentDate.getFullYear()} 
            month={currentDate.getMonth()} 
          />
        )}
      </div>
    </Layout>
  )
}
