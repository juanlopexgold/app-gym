import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Clock, Flame, Target, Activity } from "lucide-react"
import { WorkoutStats as WorkoutStatsType, MonthlyStats } from "@/types/workout"
import { calculateWorkoutStats, calculateMonthlyStats, getWorkoutsByMonth } from "@/lib/workoutStorage"

interface WorkoutStatsProps {
  year: number
  month: number
}

type WeeklyDatum = { semana: string; entrenamientos: number; duracion: number; calorias: number }
type WorkoutTypeDatum = { name: string; value: number; color: string }

export default function WorkoutStats({ year, month }: WorkoutStatsProps) {
  const [stats, setStats] = useState<WorkoutStatsType | null>(null)
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null)
  const [weeklyData, setWeeklyData] = useState<WeeklyDatum[]>([])
  const [workoutTypesData, setWorkoutTypesData] = useState<WorkoutTypeDatum[]>([])

  useEffect(() => {
    const generalStats = calculateWorkoutStats()
    setStats(generalStats)

    const currentMonthStats = calculateMonthlyStats(year, month + 1)
    setMonthlyStats(currentMonthStats)

    const generateWeeklyDataLocal = (y: number, m: number) => {
      const workouts = getWorkoutsByMonth(y, m)
      const weeks: Record<string, WeeklyDatum> = {}

      workouts.forEach(workout => {
        const date = new Date(workout.date)
        const weekKey = `Semana ${Math.ceil(date.getDate() / 7)}`

        if (!weeks[weekKey]) {
          weeks[weekKey] = { semana: weekKey, entrenamientos: 0, duracion: 0, calorias: 0 }
        }

        weeks[weekKey].entrenamientos += 1
        weeks[weekKey].duracion += workout.duration
        weeks[weekKey].calorias += workout.calories
      })

      setWeeklyData(Object.values(weeks))
    }

    const generateWorkoutTypesDataLocal = (y: number, m: number) => {
      const workouts = getWorkoutsByMonth(y, m)
      const types: Record<string, number> = {}

      workouts.forEach(workout => {
        const type = workout.routineName || workout.type
        types[type] = (types[type] || 0) + 1
      })

      const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

      setWorkoutTypesData(Object.entries(types).map(([name, value], index) => ({ name, value, color: colors[index % colors.length] })))
    }

    generateWeeklyDataLocal(year, month + 1)
    generateWorkoutTypesDataLocal(year, month + 1)
  }, [year, month])

  if (!stats || !monthlyStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 dark:text-slate-400">Cargando estadísticas...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Entrenamientos</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{monthlyStats.workouts}</p>
            </div>
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Este mes</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tiempo Total</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{monthlyStats.totalDuration}m</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{Math.round(monthlyStats.totalDuration / 60)}h {monthlyStats.totalDuration % 60}m</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Calorías</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{monthlyStats.totalCalories}</p>
            </div>
            <Flame className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quemadas este mes</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Racha Actual</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.currentStreak}</p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">días consecutivos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Entrenamientos por Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="semana" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
              <Bar dataKey="entrenamientos" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Tipos de Entrenamiento</h3>
          {workoutTypesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={workoutTypesData} cx="50%" cy="50%" labelLine={false} label={(props: { name?: string; percent?: number }) => `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {workoutTypesData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500 dark:text-slate-400">No hay datos para mostrar</div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Estadísticas Generales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.totalWorkouts}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total de Entrenamientos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.averageIntensity}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Intensidad Promedio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.longestStreak}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Racha Más Larga</p>
          </div>
        </div>
      </div>

      </div>
    )
}

