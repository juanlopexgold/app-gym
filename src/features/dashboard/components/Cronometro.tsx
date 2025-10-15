import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FaseRutina } from "../types"
import CircularTimer from "./CircularTimer"
import { Settings, SkipForward, Eye, EyeOff } from "lucide-react"

interface CronometroProps {
    fases: FaseRutina[]
    onVolver: () => void
    onFinish?: (data: { duracion: number }) => void // ✅ agregado
}

export default function Cronometro({ fases, onVolver, onFinish }: CronometroProps) {
    const [faseIndex, setFaseIndex] = useState(0)
    const [serieActual, setSerieActual] = useState(1)
    const [ejercicioActual, setEjercicioActual] = useState(0)
    const [estado, setEstado] = useState<"preparacion" | "ejercicio" | "descanso">("preparacion")
    const [tiempo, setTiempo] = useState(fases[0].preparacion)
    const [tiempoTotal, setTiempoTotal] = useState(fases[0].preparacion)
    const [activo, setActivo] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [esNuevaSerie, setEsNuevaSerie] = useState(false) // ✅ Flag para nueva serie
    
    // 🔊 Configuración de audio
    const [audioConfig, setAudioConfig] = useState({
        countdown: true,           // "3, 2, 1, ya"
        exerciseName: true,        // "Jumping Jacks"
        phaseTransition: true,     // "Siguiente fase: Pecho"
        motivational: true,        // "¡Excelente trabajo!"
        restReminder: true,        // "Tiempo de descanso"
        volume: 0.8,              // Volumen del audio
    })

    // ⚙️ Configuración de controles
    const [configuracion, setConfiguracion] = useState({
        autoPlay: true,           // Auto-iniciar siguiente ejercicio
        skipRest: false,          // Saltar descansos
        customRest: 15,           // Tiempo personalizado de descanso
        showNextExercise: true,   // Mostrar siguiente ejercicio
        fullScreen: false,        // Modo pantalla completa
        showAudioControls: false, // Mostrar controles de audio
    })

    const fase = fases[faseIndex]

    // 🔊 Función para hablar con configuración
    const speak = useCallback((text: string, priority: 'high' | 'normal' = 'normal') => {
        if (!audioConfig.volume) return
        
        const utter = new SpeechSynthesisUtterance(text)
        utter.volume = audioConfig.volume
        utter.rate = 0.9
        utter.pitch = 1.0
        utter.lang = 'es-ES'
        
        // Cancelar mensajes anteriores si es de alta prioridad
        if (priority === 'high') {
            speechSynthesis.cancel()
        }
        
        speechSynthesis.speak(utter)
    }, [audioConfig.volume])

    // 🔊 Cuenta regresiva en audio mejorada
    useEffect(() => {
        if (!activo || !audioConfig.countdown) return
        
        if (tiempo <= 3 && tiempo > 0) {
            const mensaje = tiempo === 3 ? "tres" : tiempo === 2 ? "dos" : "uno"
            speak(mensaje, 'high')
        }
        if (tiempo === 0 && activo) {
            speak("¡ya!", 'high')
        }
    }, [tiempo, activo, audioConfig.countdown, audioConfig.volume, speak])

    // 🔊 Anunciar nombre del ejercicio
    useEffect(() => {
        if (!activo || !audioConfig.exerciseName || estado !== "ejercicio") return
        
        const ejercicio = fase.ejercicios[ejercicioActual]
        if (ejercicio && tiempo === fase.repeticiones) {
            setTimeout(() => {
                speak(`Ejercicio: ${ejercicio.nombre}`, 'normal')
            }, 1000)
        }
    }, [estado, ejercicioActual, fase, activo, audioConfig.exerciseName, audioConfig.volume, speak, tiempo])

    // 🔊 Anunciar transiciones de fase
    useEffect(() => {
        if (!activo || !audioConfig.phaseTransition) return
        
        if (estado === "preparacion" && tiempo === fase.preparacion) {
            speak(`Fase: ${fase.nombre}`, 'normal')
        }
    }, [estado, fase, activo, audioConfig.phaseTransition, audioConfig.volume, speak, tiempo])

    // 🔊 Recordatorios de descanso
    useEffect(() => {
        if (!activo || !audioConfig.restReminder || estado !== "descanso") return
        
        if (tiempo === fase.descanso) {
            speak("Tiempo de descanso", 'normal')
        }
    }, [estado, fase, activo, audioConfig.restReminder, audioConfig.volume, speak, tiempo])

    // ⏱️ Lógica del cronómetro
    useEffect(() => {
        if (!activo) return

        if (tiempo === 0) {
            if (estado === "preparacion") {
                setEstado("ejercicio")
                setEjercicioActual(0)
                setTiempo(fase.repeticiones)
                setTiempoTotal(fase.repeticiones)
            } else if (estado === "ejercicio") {
                if (ejercicioActual < fase.ejercicios.length - 1) {
                    // Pasar al siguiente ejercicio en la misma serie
                    if (configuracion.skipRest) {
                        // Saltar descanso si está habilitado
                        setEjercicioActual(ejercicioActual + 1)
                        setTiempo(fase.repeticiones)
                        setTiempoTotal(fase.repeticiones)
                        setEsNuevaSerie(false)
                    } else {
                        setEstado("descanso")
                        setTiempo(configuracion.customRest || fase.descanso)
                        setTiempoTotal(configuracion.customRest || fase.descanso)
                        setEsNuevaSerie(false) // No es nueva serie
                    }
                } else {
                    // Terminó el último ejercicio de la serie, verificar si hay más series
                    if (serieActual < fase.series) {
                        // Pasar a la siguiente serie
                        setSerieActual(serieActual + 1)
                        setEjercicioActual(0) // ✅ Resetear a ejercicio 1
                        
                        if (configuracion.skipRest) {
                            // Saltar descanso entre series
                            setTiempo(fase.repeticiones)
                            setTiempoTotal(fase.repeticiones)
                            setEstado("ejercicio")
                            setEsNuevaSerie(false)
                        } else {
                            setTiempo(configuracion.customRest || fase.descanso)
                            setTiempoTotal(configuracion.customRest || fase.descanso)
                            setEstado("descanso")
                            setEsNuevaSerie(true) // ✅ Marcar como nueva serie
                        }
                    } else {
                        // Terminó la fase, verificar si hay más fases
                        if (faseIndex < fases.length - 1) {
                            setFaseIndex(faseIndex + 1)
                            setSerieActual(1)
                            setEjercicioActual(0)
                            setTiempo(fases[faseIndex + 1].preparacion)
                            setTiempoTotal(fases[faseIndex + 1].preparacion)
                            setEstado("preparacion")
                            setEsNuevaSerie(false)
                        } else {
                            // 🎉 ¡Terminó toda la rutina!
                            setActivo(false)
                            const duracionTotal = Math.round((Date.now() - startTime) / 60000)
                            onFinish?.({ duracion: duracionTotal })
                        }
                    }
                }
            } else if (estado === "descanso") {
                setEstado("ejercicio")
                setTiempo(fase.repeticiones)
                setTiempoTotal(fase.repeticiones)
                
                // ✅ Solo incrementar ejercicio si NO es una nueva serie
                if (!esNuevaSerie && ejercicioActual < fase.ejercicios.length - 1) {
                    setEjercicioActual(ejercicioActual + 1)
                }
                setEsNuevaSerie(false) // Resetear el flag
            }
        } else {
            const timer = setTimeout(() => setTiempo(tiempo - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [tiempo, activo, estado, faseIndex, serieActual, ejercicioActual, fase, fases, onFinish, startTime, esNuevaSerie, configuracion.customRest, configuracion.skipRest])

    const toggleTimer = () => {
        if (!activo) {
            setStartTime(Date.now())
        }
        setActivo(!activo)
    }

    const resetTimer = () => {
        setActivo(false)
        setFaseIndex(0)
        setSerieActual(1)
        setEjercicioActual(0)
        setEstado("preparacion")
        setTiempo(fases[0].preparacion)
        setTiempoTotal(fases[0].preparacion)
        setEsNuevaSerie(false) // ✅ Resetear el flag
    }

    const progreso = useMemo(() => {
        const totalFases = fases.length
        const faseProgreso = (faseIndex / totalFases) * 100
        return Math.round(faseProgreso)
    }, [faseIndex, fases.length])

    const ejercicio = fase.ejercicios[ejercicioActual]

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 px-2">
                    {fase.nombre}
                </h2>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                    ></div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Fase {faseIndex + 1} de {fases.length}
                </p>
            </div>

            {/* Timer principal */}
            <div className="text-center">
                <div className="mb-4 sm:mb-6">
                    <CircularTimer 
                        time={tiempo} 
                        totalTime={tiempoTotal}
                        size={180}
                        strokeWidth={8}
                        className="mx-auto"
                    />
                </div>
                <div className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-2">
                    {estado === "preparacion" && "🔥 Preparación"}
                    {estado === "ejercicio" && "💪 Ejercicio"}
                    {estado === "descanso" && "😮‍💨 Descanso"}
                </div>
            </div>

            {/* Información del ejercicio */}
            {estado === "ejercicio" && ejercicio && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Ejercicio {ejercicio.numeroEjercicio}: {ejercicio.nombre}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{ejercicio.descripcion}</p>
                    <div className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Serie {serieActual} de {fase.series} | Ejercicio {ejercicioActual + 1} de {fase.ejercicios.length}
                    </div>
                </div>
            )}

            {/* Controles de configuración */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                <Button
                    onClick={() => setConfiguracion(prev => ({ ...prev, showAudioControls: !prev.showAudioControls }))}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                >
                    <Settings className="h-3 w-3 mr-1" />
                    Audio
                </Button>
                <Button
                    onClick={() => setConfiguracion(prev => ({ ...prev, skipRest: !prev.skipRest }))}
                    variant={configuracion.skipRest ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                >
                    <SkipForward className="h-3 w-3 mr-1" />
                    Sin Descanso
                </Button>
                <Button
                    onClick={() => setConfiguracion(prev => ({ ...prev, showNextExercise: !prev.showNextExercise }))}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                >
                    {configuracion.showNextExercise ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                    Siguiente
                </Button>
            </div>

            {/* Panel de controles de audio */}
            {configuracion.showAudioControls && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-100">🔊 Configuración de Audio</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={audioConfig.countdown}
                                onChange={(e) => setAudioConfig(prev => ({ ...prev, countdown: e.target.checked }))}
                                className="rounded"
                            />
                            <span>Cuenta regresiva</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={audioConfig.exerciseName}
                                onChange={(e) => setAudioConfig(prev => ({ ...prev, exerciseName: e.target.checked }))}
                                className="rounded"
                            />
                            <span>Nombre ejercicio</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={audioConfig.phaseTransition}
                                onChange={(e) => setAudioConfig(prev => ({ ...prev, phaseTransition: e.target.checked }))}
                                className="rounded"
                            />
                            <span>Transición fase</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={audioConfig.restReminder}
                                onChange={(e) => setAudioConfig(prev => ({ ...prev, restReminder: e.target.checked }))}
                                className="rounded"
                            />
                            <span>Recordatorio descanso</span>
                        </label>
                    </div>
                    <div className="mt-2">
                        <label className="text-xs text-slate-600 dark:text-slate-400">Volumen: {Math.round(audioConfig.volume * 100)}%</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={audioConfig.volume}
                            onChange={(e) => setAudioConfig(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            )}

            {/* Información del siguiente ejercicio */}
            {configuracion.showNextExercise && estado === "ejercicio" && ejercicioActual < fase.ejercicios.length - 1 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">⏭️ Siguiente ejercicio:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        {fase.ejercicios[ejercicioActual + 1].numeroEjercicio}. {fase.ejercicios[ejercicioActual + 1].nombre}
                    </p>
                </div>
            )}

            {/* Controles */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <Button 
                    onClick={toggleTimer}
                    className={`${activo ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"} w-full sm:w-auto`}
                    size="lg"
                >
                    {activo ? "⏸️ Pausar" : "▶️ Iniciar"}
                </Button>
                <Button 
                    onClick={resetTimer} 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                    🔄 Reiniciar
                </Button>
                <Button 
                    onClick={onVolver} 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                    ← Volver
                </Button>
            </div>

            {/* Lista de ejercicios */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">📋 Ejercicios de esta fase</h3>
                <div className="space-y-1 sm:space-y-2">
                    {fase.ejercicios.map((ej, index) => (
                        <div 
                            key={index}
                            className={`p-2 rounded text-xs sm:text-sm ${
                                index === ejercicioActual && estado === "ejercicio" 
                                    ? "bg-primary text-white" 
                                    : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                            }`}
                        >
                            {ej.numeroEjercicio}. {ej.nombre}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
