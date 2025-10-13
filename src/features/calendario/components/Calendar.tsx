import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutEntry } from "@/types/workout"
import { getWorkoutsByMonth } from "@/lib/workoutStorage"
import WorkoutModal from "./WorkoutModal"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Cargar entrenamientos del mes actual
  useEffect(() => {
    const monthWorkouts = getWorkoutsByMonth(year, month + 1)
    setWorkouts(monthWorkouts)
  }, [year, month])

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Días del mes anterior (para completar la primera semana)
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        dateString: `${year}-${(month).toString().padStart(2, '0')}-${(prevMonth.getDate() - i).toString().padStart(2, '0')}`
      })
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        dateString
      })
    }

    // Días del mes siguiente (para completar la última semana)
    const remainingDays = 42 - days.length // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        dateString: `${year}-${(month + 2).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      })
    }

    return days
  }

  // Obtener entrenamientos para un día específico
  const getWorkoutsForDay = (dateString: string) => {
    return workouts.filter(w => w.date === dateString)
  }

  // Manejar click en un día
  const handleDayClick = (dateString: string) => {
    setSelectedDate(dateString)
    setShowWorkoutModal(true)
  }

  // Nombres de los meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  // Nombres de los días de la semana
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const days = getDaysInMonth(currentDate)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
      {/* Header del calendario */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            {monthNames[month]} {year}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={goToPreviousMonth}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={goToToday}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Hoy
          </Button>
          
          <Button
            onClick={goToNextMonth}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="p-4">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayWorkouts = getWorkoutsForDay(day.dateString)
            const hasWorkouts = dayWorkouts.length > 0
            
            return (
              <div
                key={index}
                className={`
                  relative min-h-[80px] p-2 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer
                  transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800
                  ${day.isCurrentMonth 
                    ? 'bg-white dark:bg-slate-900' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }
                  ${day.isToday 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : ''
                  }
                  ${hasWorkouts 
                    ? 'border-primary/50 bg-primary/5' 
                    : ''
                  }
                `}
                onClick={() => handleDayClick(day.dateString)}
              >
                <div className="flex items-center justify-between">
                  <span className={`
                    text-sm font-medium
                    ${day.isToday 
                      ? 'text-primary font-bold' 
                      : day.isCurrentMonth 
                        ? 'text-slate-800 dark:text-slate-200' 
                        : 'text-slate-400 dark:text-slate-500'
                    }
                  `}>
                    {day.date}
                  </span>
                  
                  {hasWorkouts && (
                    <div className="flex space-x-1">
                      {dayWorkouts.slice(0, 3).map((workout, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-primary rounded-full"
                          title={`${workout.routineName || workout.type} - ${workout.duration}min`}
                        />
                      ))}
                      {dayWorkouts.length > 3 && (
                        <div className="w-2 h-2 bg-slate-400 rounded-full" />
                      )}
                    </div>
                  )}
                </div>

                {/* Mostrar información del entrenamiento */}
                {hasWorkouts && (
                  <div className="mt-1 space-y-1">
                    {dayWorkouts.slice(0, 2).map((workout, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-600 dark:text-slate-400 truncate"
                        title={`${workout.routineName || workout.type} - ${workout.duration}min`}
                      >
                        {workout.routineName || workout.type}
                      </div>
                    ))}
                    {dayWorkouts.length > 2 && (
                      <div className="text-xs text-slate-500 dark:text-slate-500">
                        +{dayWorkouts.length - 2} más
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal de entrenamiento */}
      {showWorkoutModal && selectedDate && (
        <WorkoutModal
          date={selectedDate}
          onClose={() => {
            setShowWorkoutModal(false)
            setSelectedDate(null)
          }}
          onSave={() => {
            // Recargar entrenamientos
            const monthWorkouts = getWorkoutsByMonth(year, month + 1)
            setWorkouts(monthWorkouts)
            setShowWorkoutModal(false)
            setSelectedDate(null)
          }}
        />
      )}
    </div>
  )
}
