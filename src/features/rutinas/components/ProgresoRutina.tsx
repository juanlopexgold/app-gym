import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Calendar, 
  Clock, 
  Target, 
  Circle, 
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Award
} from 'lucide-react'
import { Rutina30Dias, ProgresoRutina as ProgresoRutinaType } from '@/types/rutinaCompleta'

interface ProgresoRutinaProps {
  rutina: Rutina30Dias
  progreso: ProgresoRutinaType
  onIniciarDia: (dia: number) => void
  onReiniciarRutina: () => void
}

export default function ProgresoRutina({ 
  rutina, 
  progreso, 
  onIniciarDia, 
  onReiniciarRutina 
}: ProgresoRutinaProps) {
  const [diaActual] = useState(progreso.diaActual)
  const [porcentajeCompletado, setPorcentajeCompletado] = useState(0)

  useEffect(() => {
    const completados = progreso.diasCompletados.length
    const total = rutina.duracionTotal
    setPorcentajeCompletado(Math.round((completados / total) * 100))
  }, [progreso.diasCompletados.length, rutina.duracionTotal])

  const getDiaActual = () => {
    return rutina.dias.find(dia => dia.dia === diaActual)
  }

  const getDiasRestantes = () => {
    return rutina.duracionTotal - progreso.diasCompletados.length
  }

  const getRachaActual = () => {
    // Calcular la racha más larga de días consecutivos completados
    const diasOrdenados = progreso.diasCompletados.sort((a, b) => a - b)
    let rachaMaxima = 0
    let rachaActual = 0
    
    for (let i = 0; i < diasOrdenados.length; i++) {
      if (i === 0 || diasOrdenados[i] === diasOrdenados[i-1] + 1) {
        rachaActual++
        rachaMaxima = Math.max(rachaMaxima, rachaActual)
      } else {
        rachaActual = 1
      }
    }
    
    return rachaMaxima
  }

  const getProgresoSemanal = () => {
    const semanas = []
    for (let semana = 0; semana < 4; semana++) {
      const inicioSemana = semana * 7 + 1
      const finSemana = Math.min((semana + 1) * 7, rutina.duracionTotal)
      const diasCompletadosSemana = progreso.diasCompletados.filter(
        dia => dia >= inicioSemana && dia <= finSemana
      ).length
      semanas.push({
        numero: semana + 1,
        diasCompletados: diasCompletadosSemana,
        totalDias: finSemana - inicioSemana + 1,
        porcentaje: Math.round((diasCompletadosSemana / (finSemana - inicioSemana + 1)) * 100)
      })
    }
    return semanas
  }

  const progresoSemanal = getProgresoSemanal()
  const diaActualData = getDiaActual()
  const diasRestantes = getDiasRestantes()
  const rachaActual = getRachaActual()

  return (
    <div className="space-y-6">
      {/* Header de Progreso */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          📊 Progreso de Rutina
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {rutina.nombre}
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {progreso.diasCompletados.length}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Días Completados
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {porcentajeCompletado}%
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Progreso Total
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {rachaActual}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Racha Actual
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {diasRestantes}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Días Restantes
          </p>
        </Card>
      </div>

      {/* Barra de Progreso */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              Progreso General
            </h3>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {progreso.diasCompletados.length} / {rutina.duracionTotal} días
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${porcentajeCompletado}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Progreso Semanal */}
      <Card className="p-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Progreso Semanal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {progresoSemanal.map((semana) => (
            <div key={semana.numero} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Semana {semana.numero}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {semana.diasCompletados} / {semana.totalDias} días
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                  style={{ width: `${semana.porcentaje}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {semana.porcentaje}%
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Día Actual */}
      {diaActualData && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                Día {diaActual} - {diaActualData.tipo === 'entrenamiento' ? '🏋️ Entrenamiento' : '😴 Descanso'}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  diaActualData.dificultad <= 2 ? 'bg-green-100 text-green-800' :
                  diaActualData.dificultad <= 3 ? 'bg-yellow-100 text-yellow-800' :
                  diaActualData.dificultad <= 4 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                }`}>
                  Dificultad {diaActualData.dificultad}/5
                </span>
                {diaActualData.tipo === 'entrenamiento' && (
                  <span className="flex items-center space-x-1 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{diaActualData.duracionEstimada} min</span>
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400">
              {diaActualData.descripcion}
            </p>
            
            {diaActualData.tipo === 'entrenamiento' && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Fases del entrenamiento:
                </p>
                <div className="space-y-1">
                  {diaActualData.fases.map((fase, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Circle className="h-3 w-3 text-slate-400" />
                      <span>{fase.nombre}</span>
                      <span className="text-slate-500">({fase.ejercicios.length} ejercicios)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              {diaActualData.tipo === 'entrenamiento' && (
                <Button
                  onClick={() => onIniciarDia(diaActual)}
                  className="flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Iniciar Entrenamiento</span>
                </Button>
              )}
              
              {diaActualData.tipo === 'descanso' && (
                <Button
                  onClick={() => onIniciarDia(diaActual)}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Pause className="h-4 w-4" />
                  <span>Marcar como Completado</span>
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Calendario de Días */}
      <Card className="p-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Calendario de Progreso
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: rutina.duracionTotal }, (_, index) => {
            const dia = index + 1
            // const diaData = rutina.dias.find(d => d.dia === dia)
            const estaCompletado = progreso.diasCompletados.includes(dia)
            const esDiaActual = dia === diaActual
            const esDiaPerdido = progreso.diasPerdidos.includes(dia)
            
            return (
              <div
                key={dia}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                  ${estaCompletado ? 'bg-green-500 text-white' :
                    esDiaPerdido ? 'bg-red-500 text-white' :
                    esDiaActual ? 'bg-blue-500 text-white' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}
                `}
              >
                {dia}
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Completado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Día Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Perdido</span>
          </div>
        </div>
      </Card>

      {/* Botón Reiniciar */}
      <div className="flex justify-center">
        <Button
          onClick={onReiniciarRutina}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reiniciar Rutina</span>
        </Button>
      </div>
    </div>
  )
}
