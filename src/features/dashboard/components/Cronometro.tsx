import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FaseRutina } from "../types"

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
                    setEstado("descanso")
                    setTiempo(fase.descanso)
                    setTiempoTotal(fase.descanso)
                } else {
                    // Terminó el ejercicio, verificar si hay más series
                    if (serieActual < fase.series) {
                        setSerieActual(serieActual + 1)
                        setEjercicioActual(0)
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
                if (ejercicioActual < fase.ejercicios.length - 1) {
                    setEjercicioActual(ejercicioActual + 1)
                }
            }
        } else {
            const timer = setTimeout(() => setTiempo(tiempo - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [tiempo, activo, estado, faseIndex, serieActual, ejercicioActual, fase, fases, onFinish])

    const [startTime, setStartTime] = useState(0)

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
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-2 px-2">
                    {fase.nombre}
                </h2>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                    ></div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    Fase {faseIndex + 1} de {fases.length}
                </p>
            </div>

            {/* Timer principal */}
            <div className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4">
                    {tiempo}s
                </div>
                <div className="text-base sm:text-lg text-slate-600 mb-2">
                    {estado === "preparacion" && "🔥 Preparación"}
                    {estado === "ejercicio" && "💪 Ejercicio"}
                    {estado === "descanso" && "😮‍💨 Descanso"}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((tiempoTotal - tiempo) / tiempoTotal) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Información del ejercicio */}
            {estado === "ejercicio" && ejercicio && (
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                        Ejercicio {ejercicio.numeroEjercicio}: {ejercicio.nombre}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600">{ejercicio.descripcion}</p>
                    <div className="mt-2 text-xs sm:text-sm text-slate-500">
                        Serie {serieActual} de {fase.series} | Ejercicio {ejercicioActual + 1} de {fase.ejercicios.length}
                    </div>
                </div>
            )}

            {/* Controles */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <Button 
                    onClick={toggleTimer}
                    className={`${activo ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} w-full sm:w-auto`}
                    size="lg"
                >
                    {activo ? "⏸️ Pausar" : "▶️ Iniciar"}
                </Button>
                <Button onClick={resetTimer} variant="outline" size="lg" className="w-full sm:w-auto">
                    🔄 Reiniciar
                </Button>
                <Button onClick={onVolver} variant="outline" size="lg" className="w-full sm:w-auto">
                    ← Volver
                </Button>
            </div>

            {/* Lista de ejercicios */}
            <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-3">📋 Ejercicios de esta fase</h3>
                <div className="space-y-1 sm:space-y-2">
                    {fase.ejercicios.map((ej, index) => (
                        <div 
                            key={index}
                            className={`p-2 rounded text-xs sm:text-sm ${
                                index === ejercicioActual && estado === "ejercicio" 
                                    ? "bg-primary text-white" 
                                    : "bg-white"
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
