import { useState, useEffect } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { TrendingUp, BarChart3 } from "lucide-react"
import { IMCChartData } from "@/types/imc"
import { getIMCChartData } from "@/lib/imcStorage"

export default function IMCChart() {
  const [chartData, setChartData] = useState<IMCChartData[]>([])
  const [viewType, setViewType] = useState<'line' | 'bar'>('line')

  useEffect(() => {
    const data = getIMCChartData()
    setChartData(data)
  }, [])

  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          📊 Gráficos de Progreso
        </h3>
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            No hay suficientes datos para mostrar gráficos
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Necesitas al menos 2 mediciones para ver el progreso
          </p>
        </div>
      </div>
    )
  }

  // Formatear datos para el gráfico
  const formattedData = chartData.map(item => ({
    ...item,
    dateFormatted: new Date(item.date).toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    })
  }))

  // Calcular estadísticas para el tooltip personalizado
  const CustomTooltip = (props: unknown) => {
    const p = props as { active?: boolean; payload?: unknown[] }
    const { active, payload } = p
    if (active && payload && payload.length) {
  const first = payload[0] as { payload?: unknown }
  const data = first.payload as { date?: string; weight?: number; height?: number; imc?: number; category?: string }
      return (
        <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg border border-slate-600">
          <p className="font-medium">{data.date ? new Date(data.date).toLocaleDateString('es-ES') : ''}</p>
          <div className="space-y-1 text-sm">
            <p><span className="text-blue-300">Peso:</span> {data.weight} kg</p>
            <p><span className="text-green-300">Altura:</span> {data.height} cm</p>
            <p><span className="text-yellow-300">IMC:</span> {data.imc}</p>
            <p><span className="text-purple-300">Categoría:</span> {data.category}</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Gráfico de IMC */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            📈 Evolución del IMC
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewType('line')}
              className={`p-2 rounded-lg transition-colors ${
                viewType === 'line' 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewType('bar')}
              className={`p-2 rounded-lg transition-colors ${
                viewType === 'bar' 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          {viewType === 'line' ? (
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="imc" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="imc" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Gráfico de peso */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          ⚖️ Evolución del Peso
        </h3>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="dateFormatted" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Información adicional */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          ℹ️ Información sobre el IMC
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
              Categorías de IMC
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Bajo peso:</span>
                <span className="text-slate-800 dark:text-slate-200">&lt; 18.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Peso normal:</span>
                <span className="text-slate-800 dark:text-slate-200">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Sobrepeso:</span>
                <span className="text-slate-800 dark:text-slate-200">25.0 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Obesidad I:</span>
                <span className="text-slate-800 dark:text-slate-200">30.0 - 34.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Obesidad II:</span>
                <span className="text-slate-800 dark:text-slate-200">35.0 - 39.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Obesidad III:</span>
                <span className="text-slate-800 dark:text-slate-200">≥ 40.0</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
              Recomendaciones
            </h4>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <p>• El IMC es una herramienta de referencia</p>
              <p>• Consulta con un profesional de la salud</p>
              <p>• Considera otros factores como masa muscular</p>
              <p>• Mantén un estilo de vida saludable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
