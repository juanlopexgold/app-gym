import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Dumbbell, 
  Target, 
  Clock, 
  ChevronRight, 
  Play,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { 
  getRutinasPorNivel, 
  getRutinasPorGrupoMuscular, 
  getPlanesCompletos
} from '@/lib/rutinasCompletas'
import { Rutina30Dias, PlanCompleto, NivelRutina, GrupoMuscular } from '@/types/rutinaCompleta'

interface RutinaSelectorProps {
  onSelectRutina: (rutina: Rutina30Dias) => void
  onSelectPlan: (plan: PlanCompleto) => void
}

export default function RutinaSelector({ onSelectRutina, onSelectPlan }: RutinaSelectorProps) {
  const [nivelSeleccionado, setNivelSeleccionado] = useState<NivelRutina | null>(null)
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<GrupoMuscular | null>(null)
  const [mostrarPlanes, setMostrarPlanes] = useState(false)

  const niveles: { value: NivelRutina; label: string; color: string; icon: string }[] = [
    { value: 'principiante', label: 'Principiante', color: 'bg-green-500', icon: '🌱' },
    { value: 'intermedio', label: 'Intermedio', color: 'bg-blue-500', icon: '💪' },
    { value: 'avanzado', label: 'Avanzado', color: 'bg-orange-500', icon: '🔥' },
    { value: 'intenso', label: 'Intenso', color: 'bg-red-500', icon: '⚡' }
  ]

  const gruposMusculares: { value: GrupoMuscular; label: string; icon: string }[] = [
    { value: 'pierna_gluteos', label: 'Piernas y Glúteos', icon: '🦵' },
    { value: 'brazos', label: 'Brazos', icon: '💪' },
    { value: 'espalda', label: 'Espalda', icon: '🏋️' },
    { value: 'pecho', label: 'Pecho', icon: '💨' },
    { value: 'hombros', label: 'Hombros', icon: '🤸' },
    { value: 'core', label: 'Core', icon: '🎯' },
    { value: 'cardio', label: 'Cardio', icon: '❤️' },
    { value: 'full_body', label: 'Full Body', icon: '🔥' }
  ]

  const planes = getPlanesCompletos()

  const getRutinasFiltradas = () => {
    if (nivelSeleccionado && grupoSeleccionado) {
      const rutinasNivel = getRutinasPorNivel(nivelSeleccionado)
      return rutinasNivel.filter(rutina => rutina.grupoMuscular === grupoSeleccionado)
    } else if (nivelSeleccionado) {
      return getRutinasPorNivel(nivelSeleccionado)
    } else if (grupoSeleccionado) {
      return getRutinasPorGrupoMuscular(grupoSeleccionado)
    }
    return []
  }

  const rutinasFiltradas = getRutinasFiltradas()

  const resetFiltros = () => {
    setNivelSeleccionado(null)
    setGrupoSeleccionado(null)
    setMostrarPlanes(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          🏋️ Selecciona tu Rutina
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Elige el nivel y grupo muscular que mejor se adapte a tus objetivos
        </p>
      </div>

      {/* Botón para mostrar planes completos */}
      <div className="flex justify-center">
        <Button
          onClick={() => setMostrarPlanes(!mostrarPlanes)}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span>{mostrarPlanes ? 'Ver Rutinas Individuales' : 'Ver Planes Completos'}</span>
        </Button>
      </div>

      {mostrarPlanes ? (
        /* Planes Completos */
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 text-center">
            📅 Planes Completos de 30 Días
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planes.map((plan) => (
              <Card key={plan.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      plan.nivel === 'principiante' ? 'bg-green-500' :
                      plan.nivel === 'intermedio' ? 'bg-blue-500' :
                      plan.nivel === 'avanzado' ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {plan.nombre}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {plan.descripcion}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{plan.duracionTotal} días</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Target className="h-4 w-4 text-slate-500" />
                      <span>{plan.objetivos.length} objetivos</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onSelectPlan(plan)}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Iniciar Plan</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Rutinas Individuales */
        <div className="space-y-6">
          {/* Filtros */}
          <div className="space-y-4">
            {/* Niveles */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Nivel de Dificultad
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {niveles.map((nivel) => (
                  <Button
                    key={nivel.value}
                    onClick={() => setNivelSeleccionado(
                      nivelSeleccionado === nivel.value ? null : nivel.value
                    )}
                    variant={nivelSeleccionado === nivel.value ? 'default' : 'outline'}
                    className="flex items-center space-x-2"
                  >
                    <span>{nivel.icon}</span>
                    <span>{nivel.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Grupos Musculares */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Grupo Muscular
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gruposMusculares.map((grupo) => (
                  <Button
                    key={grupo.value}
                    onClick={() => setGrupoSeleccionado(
                      grupoSeleccionado === grupo.value ? null : grupo.value
                    )}
                    variant={grupoSeleccionado === grupo.value ? 'default' : 'outline'}
                    className="flex items-center space-x-2"
                  >
                    <span>{grupo.icon}</span>
                    <span>{grupo.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Botón reset */}
            {(nivelSeleccionado || grupoSeleccionado) && (
              <div className="flex justify-center">
                <Button onClick={resetFiltros} variant="outline" size="sm">
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>

          {/* Rutinas Filtradas */}
          {rutinasFiltradas.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Rutinas Disponibles ({rutinasFiltradas.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rutinasFiltradas.map((rutina) => (
                  <Card key={rutina.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                          {rutina.nombre}
                        </h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rutina.nivel === 'principiante' ? 'bg-green-100 text-green-800' :
                          rutina.nivel === 'intermedio' ? 'bg-blue-100 text-blue-800' :
                          rutina.nivel === 'avanzado' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {rutina.nivel}
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {rutina.descripcion}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{rutina.duracionTotal} días</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-slate-500" />
                          <span>Dificultad {rutina.dias[0]?.dificultad || 1}/5</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          Objetivos:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {rutina.objetivos.slice(0, 2).map((objetivo, index) => (
                            <span key={index} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                              {objetivo}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => onSelectRutina(rutina)}
                        className="w-full flex items-center justify-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Iniciar Rutina</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje cuando no hay filtros */}
          {!nivelSeleccionado && !grupoSeleccionado && (
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                Selecciona un nivel y/o grupo muscular para ver las rutinas disponibles
              </p>
            </div>
          )}

          {/* Mensaje cuando no hay resultados */}
          {rutinasFiltradas.length === 0 && (nivelSeleccionado || grupoSeleccionado) && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No hay rutinas disponibles para los filtros seleccionados
              </p>
              <Button onClick={resetFiltros} variant="outline" className="mt-4">
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
