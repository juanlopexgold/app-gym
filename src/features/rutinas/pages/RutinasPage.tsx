import { useState } from 'react'
import { Layout } from "@/components/layouts/Layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import RutinaSelector from "../components/RutinaSelector"
import ProgresoRutina from "../components/ProgresoRutina"
import { Rutina30Dias, PlanCompleto, ProgresoRutina as ProgresoRutinaType } from "@/types/rutinaCompleta"

export default function RutinasPage() {
  const navigate = useNavigate()
  const [rutinaActiva, setRutinaActiva] = useState<Rutina30Dias | null>(null)
  const [planActivo, setPlanActivo] = useState<PlanCompleto | null>(null)
  const [progreso, setProgreso] = useState<ProgresoRutinaType | null>(null)

  const handleSelectRutina = (rutina: Rutina30Dias) => {
    setRutinaActiva(rutina)
    setPlanActivo(null)
    
    // Crear progreso inicial
    const nuevoProgreso: ProgresoRutinaType = {
      rutinaId: rutina.id,
      diaActual: 1,
      fechaInicio: new Date().toISOString().split('T')[0],
      diasCompletados: [],
      diasPerdidos: [],
      estadisticas: {
        tiempoTotal: 0,
        caloriasQuemadas: 0,
        ejerciciosCompletados: 0
      }
    }
    setProgreso(nuevoProgreso)
  }

  const handleSelectPlan = (plan: PlanCompleto) => {
    setPlanActivo(plan)
    setRutinaActiva(null)
    // Aquí podrías implementar la lógica para manejar planes completos
  }

  const handleIniciarDia = (dia: number) => {
    if (!progreso) return
    
    // Navegar al cronómetro con la rutina del día
    const diaData = rutinaActiva?.dias.find(d => d.dia === dia)
    if (diaData && diaData.tipo === 'entrenamiento') {
      // Guardar la rutina del día en localStorage para el cronómetro
      localStorage.setItem('rutinaActual', JSON.stringify({
        rutina: rutinaActiva,
        dia: diaData,
        progreso: progreso
      }))
      
      // Navegar al cronómetro
      navigate('/cronometro')
    } else {
      // Marcar día de descanso como completado
      const nuevoProgreso = {
        ...progreso,
        diasCompletados: [...progreso.diasCompletados, dia],
        diaActual: Math.min(dia + 1, rutinaActiva?.duracionTotal || 30)
      }
      setProgreso(nuevoProgreso)
    }
  }

  const handleReiniciarRutina = () => {
    if (!rutinaActiva) return
    
    const nuevoProgreso: ProgresoRutinaType = {
      rutinaId: rutinaActiva.id,
      diaActual: 1,
      fechaInicio: new Date().toISOString().split('T')[0],
      diasCompletados: [],
      diasPerdidos: [],
      estadisticas: {
        tiempoTotal: 0,
        caloriasQuemadas: 0,
        ejerciciosCompletados: 0
      }
    }
    setProgreso(nuevoProgreso)
  }

  const handleVolver = () => {
    setRutinaActiva(null)
    setPlanActivo(null)
    setProgreso(null)
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            {(rutinaActiva || planActivo) && (
              <Button
                onClick={handleVolver}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver</span>
              </Button>
            )}
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Button>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {rutinaActiva ? `📊 ${rutinaActiva.nombre}` : 
             planActivo ? `📅 ${planActivo.nombre}` : 
             '💪 Rutinas de Entrenamiento'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
            {rutinaActiva ? 'Sigue tu progreso y completa tu rutina de 30 días' :
             planActivo ? 'Plan completo con rutinas por grupos musculares' :
             'Selecciona una rutina o plan de entrenamiento de 30 días'}
          </p>
        </div>

        {/* Contenido Principal */}
        {rutinaActiva && progreso ? (
          <ProgresoRutina
            rutina={rutinaActiva}
            progreso={progreso}
            onIniciarDia={handleIniciarDia}
            onReiniciarRutina={handleReiniciarRutina}
          />
        ) : planActivo ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Plan Completo Seleccionado
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {planActivo.descripcion}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(planActivo.rutinas).map(([grupo, rutina]) => (
                <div key={grupo} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {rutina?.nombre}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {rutina?.descripcion}
                  </p>
                  <Button
                    onClick={() => rutina && handleSelectRutina(rutina)}
                    className="w-full"
                  >
                    Iniciar Rutina
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <RutinaSelector
            onSelectRutina={handleSelectRutina}
            onSelectPlan={handleSelectPlan}
          />
        )}
      </div>
    </Layout>
  )
}
