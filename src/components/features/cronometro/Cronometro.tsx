import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import FaseTimer from "./FaseTimer"
import { FaseRutina } from "@/types/rutina"

interface CronometroProps {
  fases: FaseRutina[]
  onVolver: () => void
}

export default function Cronometro({ fases, onVolver }: CronometroProps) {
  const [faseIndex, setFaseIndex] = useState(0)
  const [serieActual, setSerieActual] = useState(1)
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [estado, setEstado] = useState<"preparacion" | "ejercicio" | "descanso">("preparacion")
  const [tiempo, setTiempo] = useState(fases[0].preparacion)
  const [activo, setActivo] = useState(false)

  const fase = fases[faseIndex]

  useEffect(() => {
    if (!activo) return

    if (tiempo === 0) {
      if (estado === "preparacion") {
        setEstado("ejercicio")
        setEjercicioActual(0)
        setTiempo(fase.repeticiones)
      } else if (estado === "ejercicio") {
        if (ejercicioActual < fase.ejercicios.length - 1) {
          setEstado("descanso")
          setTiempo(fase.descanso)
        } else {
          if (serieActual < fase.series) {
            setSerieActual(serieActual + 1)
            setEjercicioActual(0)
            setEstado("preparacion")
            setTiempo(fase.preparacion)
          } else {
            if (faseIndex < fases.length - 1) {
              setFaseIndex(faseIndex + 1)
              setSerieActual(1)
              setEjercicioActual(0)
              setEstado("preparacion")
              setTiempo(fases[faseIndex + 1].preparacion)
            } else {
              setActivo(false) // rutina terminada
            }
          }
        }
      } else if (estado === "descanso") {
        setEstado("ejercicio")
        setEjercicioActual(ejercicioActual + 1)
        setTiempo(fase.repeticiones)
      }
    }

    const timer = setInterval(() => {
      setTiempo((t) => (t > 0 ? t - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [activo, tiempo, estado, ejercicioActual, serieActual, fase, faseIndex, fases])

  const iniciar = () => setActivo(true)
  const pausar = () => setActivo(false)
  const reiniciar = () => {
    setActivo(false)
    setFaseIndex(0)
    setSerieActual(1)
    setEjercicioActual(0)
    setEstado("preparacion")
    setTiempo(fases[0].preparacion)
  }

  const ejercicioEnCurso =
    estado === "ejercicio" && fase.ejercicios[ejercicioActual]
      ? fase.ejercicios[ejercicioActual]
      : null

  // 🎨 Colores dinámicos según estado
  const estadoColor =
    estado === "preparacion"
      ? "text-blue-600"
      : estado === "ejercicio"
      ? "text-green-600"
      : "text-red-600"

  const bgColor =
    estado === "preparacion"
      ? "bg-blue-100"
      : estado === "ejercicio"
      ? "bg-green-100"
      : "bg-red-100"

  return (
    <div className={`text-center space-y-6 p-6 rounded-lg shadow-md ${bgColor}`}>
      <h2 className={`text-2xl font-bold ${estadoColor}`}>{fase.nombre}</h2>
      <p className="text-sm text-slate-500">
        Serie {serieActual}/{fase.series} · Ejercicio {ejercicioActual + 1}/{fase.ejercicios.length}
      </p>

      <div className={`text-5xl font-extrabold ${estadoColor} animate-pulse`}>
        <FaseTimer fase={estado} tiempo={tiempo} />
      </div>

      {/* Mostrar nombre y descripción del ejercicio actual */}
      {ejercicioEnCurso && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{ejercicioEnCurso.nombre}</h3>
          <p className="text-slate-600">{ejercicioEnCurso.descripcion}</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!activo ? (
          <Button onClick={iniciar} className="bg-green-500 hover:bg-green-600 text-white">
            Iniciar
          </Button>
        ) : (
          <Button variant="secondary" onClick={pausar} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Pausar
          </Button>
        )}
        <Button variant="outline" onClick={reiniciar}>Reiniciar</Button>
        <Button variant="ghost" onClick={onVolver}>Volver a Configuración</Button>
      </div>
    </div>
  )
}