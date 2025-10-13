import { WorkoutEntry, WorkoutStats, MonthlyStats, WeeklyStats } from "@/types/workout"

const STORAGE_KEY = "workoutEntries"

// Obtener todos los entrenamientos
export function getAllWorkouts(): WorkoutEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

// Guardar un entrenamiento
export function saveWorkout(workout: WorkoutEntry): void {
  const workouts = getAllWorkouts()
  const existingIndex = workouts.findIndex(w => w.id === workout.id)
  
  if (existingIndex >= 0) {
    workouts[existingIndex] = workout
  } else {
    workouts.push(workout)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
}

// Eliminar un entrenamiento
export function deleteWorkout(id: string): void {
  const workouts = getAllWorkouts()
  const filtered = workouts.filter(w => w.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// Obtener entrenamientos por fecha
export function getWorkoutsByDate(date: string): WorkoutEntry[] {
  const workouts = getAllWorkouts()
  return workouts.filter(w => w.date === date)
}

// Obtener entrenamientos por mes
export function getWorkoutsByMonth(year: number, month: number): WorkoutEntry[] {
  const workouts = getAllWorkouts()
  const monthStr = `${year}-${month.toString().padStart(2, '0')}`
  return workouts.filter(w => w.date.startsWith(monthStr))
}

// Obtener entrenamientos por rango de fechas
export function getWorkoutsByDateRange(startDate: string, endDate: string): WorkoutEntry[] {
  const workouts = getAllWorkouts()
  return workouts.filter(w => w.date >= startDate && w.date <= endDate)
}

// Generar ID único
export function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Calcular estadísticas generales
export function calculateWorkoutStats(): WorkoutStats {
  const workouts = getAllWorkouts()
  
  if (workouts.length === 0) {
    return {
      totalWorkouts: 0,
      totalDuration: 0,
      totalCalories: 0,
      averageIntensity: 0,
      currentStreak: 0,
      longestStreak: 0,
      workoutsThisMonth: 0,
      workoutsLastMonth: 0
    }
  }

  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthStr = `${lastMonth.getFullYear()}-${(lastMonth.getMonth() + 1).toString().padStart(2, '0')}`

  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0)
  const averageIntensity = workouts.reduce((sum, w) => sum + w.intensity, 0) / workouts.length

  const workoutsThisMonth = workouts.filter(w => w.date.startsWith(currentMonth)).length
  const workoutsLastMonth = workouts.filter(w => w.date.startsWith(lastMonthStr)).length

  // Calcular racha actual
  const sortedDates = [...new Set(workouts.map(w => w.date))].sort().reverse()
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  for (let i = 0; i < sortedDates.length; i++) {
    const date = new Date(sortedDates[i])
    const prevDate = i > 0 ? new Date(sortedDates[i - 1]) : null
    
    if (i === 0 || (prevDate && date.getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000)) {
      tempStreak++
      if (i === 0) currentStreak = tempStreak
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak)

  // Playlist y rutina más usadas
  const playlistCount: Record<string, number> = {}
  const routineCount: Record<string, number> = {}
  
  workouts.forEach(w => {
    if (w.playlist) {
      playlistCount[w.playlist] = (playlistCount[w.playlist] || 0) + 1
    }
    if (w.routineName) {
      routineCount[w.routineName] = (routineCount[w.routineName] || 0) + 1
    }
  })

  const mostUsedPlaylist = Object.keys(playlistCount).reduce((a, b) => 
    playlistCount[a] > playlistCount[b] ? a : b, '')
  const mostUsedRoutine = Object.keys(routineCount).reduce((a, b) => 
    routineCount[a] > routineCount[b] ? a : b, '')

  return {
    totalWorkouts: workouts.length,
    totalDuration,
    totalCalories,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    mostUsedPlaylist: mostUsedPlaylist || undefined,
    mostUsedRoutine: mostUsedRoutine || undefined,
    currentStreak,
    longestStreak,
    workoutsThisMonth,
    workoutsLastMonth
  }
}

// Calcular estadísticas mensuales
export function calculateMonthlyStats(year: number, month: number): MonthlyStats {
  const workouts = getWorkoutsByMonth(year, month)
  
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0)
  const averageIntensity = workouts.length > 0 
    ? workouts.reduce((sum, w) => sum + w.intensity, 0) / workouts.length 
    : 0

  const workoutTypes: Record<string, number> = {}
  workouts.forEach(w => {
    const type = w.routineName || w.type
    workoutTypes[type] = (workoutTypes[type] || 0) + 1
  })

  return {
    month: `${year}-${month.toString().padStart(2, '0')}`,
    workouts: workouts.length,
    totalDuration,
    totalCalories,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    workoutTypes
  }
}

// Calcular estadísticas semanales
export function calculateWeeklyStats(startDate: string, endDate: string): WeeklyStats {
  const workouts = getWorkoutsByDateRange(startDate, endDate)
  
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0)

  return {
    week: startDate, // Usar fecha de inicio como identificador de semana
    workouts: workouts.length,
    totalDuration,
    totalCalories
  }
}
