import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FaseRutina } from "../types"
import CircularTimer from "./CircularTimer"

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

    const fase = fases[faseIndex]

    // 🔊 Cuenta regresiva en audio
    useEffect(() => {
        if (!activo) return
        if (tiempo <= 3 && tiempo > 0) {
            const utter = new SpeechSynthesisUtterance(
                tiempo === 3 ? "tres" : tiempo === 2 ? "dos" : "uno"
            )
            speechSynthesis.speak(utter)
        }
        if (tiempo === 0 && activo) {
            const utter = new SpeechSynthesisUtterance("ya")
            speechSynthesis.speak(utter)
        }
    }, [tiempo, activo])

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
                    setEstado("descanso")
                    setTiempo(fase.descanso)
                    setTiempoTotal(fase.descanso)
                } else {
                    // Terminó el último ejercicio de la serie, verificar si hay más series
                    if (serieActual < fase.series) {
                        // Pasar a la siguiente serie
                        setSerieActual(serieActual + 1)
                        setEjercicioActual(0) // ✅ Resetear a ejercicio 1
                        setTiempo(fase.descanso)
                        setTiempoTotal(fase.descanso)
                        setEstado("descanso")
                    } else {
                        // Terminó la fase, verificar si hay más fases
                        if (faseIndex < fases.length - 1) {
                            setFaseIndex(faseIndex + 1)
                            setSerieActual(1)
                            setEjercicioActual(0)
                            setTiempo(fases[faseIndex + 1].preparacion)
                            setTiempoTotal(fases[faseIndex + 1].preparacion)
                            setEstado("preparacion")
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
                
                // ✅ Solo incrementar ejercicio si NO es el primer ejercicio de una nueva serie
                // Si ejercicioActual es 0, significa que acabamos de empezar una nueva serie
                if (ejercicioActual > 0 && ejercicioActual < fase.ejercicios.length - 1) {
                    setEjercicioActual(ejercicioActual + 1)
                }
            }
        } else {
            const timer = setTimeout(() => setTiempo(tiempo - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [tiempo, activo, estado, faseIndex, serieActual, ejercicioActual, fase, fases, onFinish, startTime])

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
