import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Minus, Calendar, Scale, Ruler } from "lucide-react"
import { IMCStats as IMCStatsType } from "@/types/imc"
import { calculateIMCStats, getLastMonthEntries, getLastYearEntries } from "@/lib/imcStorage"
import { getIMCCategoryDescription, getIMCCategoryColor } from "@/types/imc"

export default function IMCStats() {
  const [stats, setStats] = useState<IMCStatsType | null>(null)
  const [lastMonthEntries, setLastMonthEntries] = useState(0)
  const [lastYearEntries, setLastYearEntries] = useState(0)

  useEffect(() => {
    const currentStats = calculateIMCStats()
    setStats(currentStats)
    setLastMonthEntries(getLastMonthEntries().length)
    setLastYearEntries(getLastYearEntries().length)
  }, [])

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-slate-500 dark:text-slate-400">Cargando estadísticas...</div>
      </div>
    )
  }

  if (stats.totalEntries === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          📊 Estadísticas de IMC
        </h3>
        <div className="text-center py-8">
          <Scale className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            No hay mediciones registradas aún
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Calcula tu IMC y guárdalo para ver estadísticas
          </p>
        </div>
      </div>
    )
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-slate-500" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-red-600 dark:text-red-400"
    if (change < 0) return "text-green-600 dark:text-green-400"
    return "text-slate-600 dark:text-slate-400"
  }

  return (
    <div className="space-y-6">
      {/* Cards principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* IMC Actual */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">IMC Actual</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stats.currentIMC}
              </p>
            </div>
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getIMCCategoryColor(stats.currentCategory)}`}>
            {getIMCCategoryDescription(stats.currentCategory)}
          </div>
        </div>

        {/* Cambio de Peso */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Cambio de Peso</p>
              <div className="flex items-center space-x-1">
                {getTrendIcon(stats.weightChange)}
                <p className={`text-lg font-bold ${getTrendColor(stats.weightChange)}`}>
                  {stats.weightChange > 0 ? '+' : ''}{stats.weightChange} kg
                </p>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Desde la primera medición
          </p>
        </div>

        {/* Cambio de Altura */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Cambio de Altura</p>
              <div className="flex items-center space-x-1">
                {getTrendIcon(stats.heightChange)}
                <p className={`text-lg font-bold ${getTrendColor(stats.heightChange)}`}>
                  {stats.heightChange > 0 ? '+' : ''}{stats.heightChange} cm
                </p>
              </div>
            </div>
            <Ruler className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Desde la primera medición
          </p>
        </div>

        {/* Total de Mediciones */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Mediciones</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stats.totalEntries}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Registros guardados
          </p>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          📈 Estadísticas Detalladas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {stats.averageIMC}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              IMC Promedio
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {lastMonthEntries}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mediciones este mes
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {lastYearEntries}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mediciones este año
            </p>
          </div>
        </div>
      </div>

      {/* Información de primera y última medición */}
      {stats.firstEntry && stats.lastEntry && (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            📅 Historial de Mediciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                Primera Medición
              </h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-slate-600 dark:text-slate-400">Fecha:</span> {new Date(stats.firstEntry.date).toLocaleDateString('es-ES')}</p>
                <p><span className="text-slate-600 dark:text-slate-400">Peso:</span> {stats.firstEntry.weight} kg</p>
                <p><span className="text-slate-600 dark:text-slate-400">Altura:</span> {stats.firstEntry.height} cm</p>
                <p><span className="text-slate-600 dark:text-slate-400">IMC:</span> {stats.firstEntry.imc}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                Última Medición
              </h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-slate-600 dark:text-slate-400">Fecha:</span> {new Date(stats.lastEntry.date).toLocaleDateString('es-ES')}</p>
                <p><span className="text-slate-600 dark:text-slate-400">Peso:</span> {stats.lastEntry.weight} kg</p>
                <p><span className="text-slate-600 dark:text-slate-400">Altura:</span> {stats.lastEntry.height} cm</p>
                <p><span className="text-slate-600 dark:text-slate-400">IMC:</span> {stats.lastEntry.imc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
