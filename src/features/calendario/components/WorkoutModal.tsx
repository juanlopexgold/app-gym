import { useState, useEffect } from "react"
import { X, Clock, Flame, Star, Music, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WorkoutEntry } from "@/types/workout"
import { saveWorkout, generateWorkoutId, getWorkoutsByDate } from "@/lib/workoutStorage"
import { getAllPlaylists } from "@/lib/defaultPlaylists"

interface WorkoutModalProps {
  date: string
  onClose: () => void
  onSave: () => void
  workoutId?: string // Para editar un entrenamiento existente
}

export default function WorkoutModal({ date, onClose, onSave, workoutId }: WorkoutModalProps) {
  const [workout, setWorkout] = useState<Partial<WorkoutEntry>>({
    date,
    time: new Date().toTimeString().slice(0, 5),
    type: 'manual',
    duration: 30,
    calories: 0,
    intensity: 3,
    notes: ''
  })
  const [playlists, setPlaylists] = useState<any[]>([])

  // Cargar playlists disponibles
  useEffect(() => {
    setPlaylists(getAllPlaylists())
  }, [])

  // Cargar entrenamiento existente si se está editando
  useEffect(() => {
    if (workoutId) {
      const existingWorkouts = getWorkoutsByDate(date)
      const existingWorkout = existingWorkouts.find(w => w.id === workoutId)
      if (existingWorkout) {
        setWorkout(existingWorkout)
      }
    }
  }, [workoutId, date])

  // Calcular calorías automáticamente basado en duración e intensidad
  useEffect(() => {
    if (workout.duration && workout.intensity) {
      const baseCalories = workout.duration * 5 // 5 calorías por minuto base
      const intensityMultiplier = workout.intensity * 0.5 // 0.5x por nivel de intensidad
      const calculatedCalories = Math.round(baseCalories * (1 + intensityMultiplier))
      setWorkout(prev => ({ ...prev, calories: calculatedCalories }))
    }
  }, [workout.duration, workout.intensity])

  const handleSave = () => {
    if (!workout.duration || workout.duration <= 0) {
      alert('Por favor ingresa una duración válida')
      return
    }

    const workoutToSave: WorkoutEntry = {
      id: workoutId || generateWorkoutId(),
      date: workout.date!,
      time: workout.time!,
      type: workout.type!,
      routineName: workout.routineName,
      duration: workout.duration!,
      calories: workout.calories!,
      intensity: workout.intensity!,
      playlist: workout.playlist,
      notes: workout.notes,
      exercises: workout.exercises,
      createdAt: workout.createdAt || new Date().toISOString()
    }

    saveWorkout(workoutToSave)
    onSave()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {workoutId ? 'Editar Entrenamiento' : 'Agregar Entrenamiento'}
          </h3>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-4">
          {/* Fecha */}
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Fecha
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {formatDate(date)}
            </p>
          </div>

          {/* Hora */}
          <div>
            <Label htmlFor="time" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Hora
            </Label>
            <Input
              id="time"
              type="time"
              value={workout.time}
              onChange={(e) => setWorkout(prev => ({ ...prev, time: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Tipo de entrenamiento */}
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Tipo de Entrenamiento
            </Label>
            <div className="flex space-x-2 mt-2">
              <Button
                onClick={() => setWorkout(prev => ({ ...prev, type: 'manual' }))}
                variant={workout.type === 'manual' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
              >
                Manual
              </Button>
              <Button
                onClick={() => setWorkout(prev => ({ ...prev, type: 'cronometro' }))}
                variant={workout.type === 'cronometro' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
              >
                Cronómetro
              </Button>
            </div>
          </div>

          {/* Nombre de rutina (si es cronómetro) */}
          {workout.type === 'cronometro' && (
            <div>
              <Label htmlFor="routineName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Nombre de la Rutina
              </Label>
              <Input
                id="routineName"
                value={workout.routineName || ''}
                onChange={(e) => setWorkout(prev => ({ ...prev, routineName: e.target.value }))}
                placeholder="Ej: Pecho + Tríceps"
                className="mt-1"
              />
            </div>
          )}

          {/* Duración */}
          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Clock className="h-4 w-4 inline mr-1" />
              Duración (minutos)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={workout.duration}
              onChange={(e) => setWorkout(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              className="mt-1"
            />
          </div>

          {/* Intensidad */}
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Star className="h-4 w-4 inline mr-1" />
              Intensidad
            </Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setWorkout(prev => ({ ...prev, intensity: level as 1 | 2 | 3 | 4 | 5 }))}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${workout.intensity && workout.intensity >= level
                      ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'text-slate-400 hover:text-yellow-500'
                    }
                  `}
                >
                  <Star className="h-5 w-5 fill-current" />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {workout.intensity === 1 && 'Muy fácil'}
              {workout.intensity === 2 && 'Fácil'}
              {workout.intensity === 3 && 'Moderado'}
              {workout.intensity === 4 && 'Intenso'}
              {workout.intensity === 5 && 'Muy intenso'}
            </p>
          </div>

          {/* Calorías */}
          <div>
            <Label htmlFor="calories" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Flame className="h-4 w-4 inline mr-1" />
              Calorías Quemadas
            </Label>
            <Input
              id="calories"
              type="number"
              min="0"
              value={workout.calories}
              onChange={(e) => setWorkout(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
              className="mt-1"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Se calcula automáticamente basado en duración e intensidad
            </p>
          </div>

          {/* Playlist */}
          <div>
            <Label htmlFor="playlist" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Music className="h-4 w-4 inline mr-1" />
              Playlist Utilizada
            </Label>
            <select
              id="playlist"
              value={workout.playlist || ''}
              onChange={(e) => setWorkout(prev => ({ ...prev, playlist: e.target.value }))}
              className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="">Sin playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.nombre}>
                  {playlist.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Notas */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <FileText className="h-4 w-4 inline mr-1" />
              Notas
            </Label>
            <textarea
              id="notes"
              value={workout.notes || ''}
              onChange={(e) => setWorkout(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Agrega notas sobre tu entrenamiento..."
              className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {workoutId ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
