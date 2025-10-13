export interface ExerciseEntry {
  name: string
  duration: number // en segundos
  sets?: number
  reps?: number
  weight?: number
}

export interface WorkoutEntry {
  id: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  type: 'cronometro' | 'manual'
  routineName?: string // Si viene del cronómetro
  duration: number // en minutos
  calories: number
  intensity: 1 | 2 | 3 | 4 | 5
  playlist?: string
  notes?: string
  exercises?: ExerciseEntry[]
  createdAt: string // ISO timestamp
}

export interface WorkoutStats {
  totalWorkouts: number
  totalDuration: number // en minutos
  totalCalories: number
  averageIntensity: number
  mostUsedPlaylist?: string
  mostUsedRoutine?: string
  currentStreak: number // días consecutivos
  longestStreak: number
  workoutsThisMonth: number
  workoutsLastMonth: number
}

export interface MonthlyStats {
  month: string // YYYY-MM
  workouts: number
  totalDuration: number
  totalCalories: number
  averageIntensity: number
  workoutTypes: Record<string, number>
}

export interface WeeklyStats {
  week: string // YYYY-WW
  workouts: number
  totalDuration: number
  totalCalories: number
}
