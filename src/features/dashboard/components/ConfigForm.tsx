import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaseRutina, Ejercicio } from "../types"

interface ConfigFormProps {
  onConfigurar: (fases: FaseRutina[]) => void
}

export default function ConfigForm({ onConfigurar }: ConfigFormProps) {
  const [fases, setFases] = useState<FaseRutina[]>([])
  const [faseActual, setFaseActual] = useState<FaseRutina>({
    nombre: "",
    preparacion: 10,
    ejercicios: [],
    repeticiones: 10,
    descanso: 15,
    series: 1,
  })

  const [ejercicioActual, setEjercicioActual] = useState<Ejercicio>({
    numeroEjercicio: 1,
    nombre: "",
    descripcion: "",
  })

  const handleChangeFase = (field: keyof FaseRutina, value: string | number) => {
    setFaseActual({ ...faseActual, [field]: value })
  }

  const handleChangeEjercicio = (field: keyof Ejercicio, value: string) => {
    setEjercicioActual({ ...ejercicioActual, [field]: value })
  }

  const agregarEjercicio = () => {
    if (!ejercicioActual.nombre) return
    const nuevos = [...faseActual.ejercicios, ejercicioActual]
    setFaseActual({
      ...faseActual,
      ejercicios: nuevos,
    })
    setEjercicioActual({
      numeroEjercicio: nuevos.length + 1,
      nombre: "",
      descripcion: "",
    })
  }

  const quitarEjercicio = (index: number) => {
    const nuevos = faseActual.ejercicios.filter((_, i) => i !== index)
    setFaseActual({
      ...faseActual,
      ejercicios: nuevos.map((ej, i) => ({ ...ej, numeroEjercicio: i + 1 })),
    })
  }

  const agregarFase = () => {
    if (!faseActual.nombre || faseActual.ejercicios.length === 0) return
    setFases([...fases, faseActual])
    setFaseActual({
      nombre: "",
      preparacion: 10,
      ejercicios: [],
      repeticiones: 10,
      descanso: 15,
      series: 1,
    })
    setEjercicioActual({
      numeroEjercicio: 1,
      nombre: "",
      descripcion: "",
    })
  }

  const quitarFase = (index: number) => {
    setFases(fases.filter((_, i) => i !== index))
  }

  const configurar = () => {
    if (fases.length === 0) return
    onConfigurar(fases)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-semibold">Configurar Nueva Rutina</h3>

      {/* Lista de fases */}
      {fases.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm sm:text-base">Fases configuradas:</h4>
          {fases.map((fase, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-100 p-2 sm:p-3 rounded gap-2">
              <span className="text-xs sm:text-sm">{fase.nombre} ({fase.ejercicios.length} ejercicios)</span>
              <Button
                onClick={() => quitarFase(index)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs"
              >
                Quitar
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Configuración de fase actual */}
      <div className="border rounded p-3 sm:p-4 space-y-3 sm:space-y-4">
        <h4 className="font-medium text-sm sm:text-base">Configurar Fase</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="nombreFase" className="text-xs sm:text-sm">Nombre de la fase</Label>
            <Input
              id="nombreFase"
              value={faseActual.nombre}
              onChange={(e) => handleChangeFase("nombre", e.target.value)}
              placeholder="Ej: Calentamiento"
              className="h-8 sm:h-10"
            />
          </div>
          <div>
            <Label htmlFor="series" className="text-xs sm:text-sm">Series</Label>
            <Input
              id="series"
              type="number"
              value={faseActual.series}
              onChange={(e) => handleChangeFase("series", parseInt(e.target.value) || 1)}
              min="1"
              className="h-8 sm:h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="preparacion" className="text-xs sm:text-sm">Preparación (seg)</Label>
            <Input
              id="preparacion"
              type="number"
              value={faseActual.preparacion}
              onChange={(e) => handleChangeFase("preparacion", parseInt(e.target.value) || 0)}
              min="0"
              className="h-8 sm:h-10"
            />
          </div>
          <div>
            <Label htmlFor="repeticiones" className="text-xs sm:text-sm">Ejercicio (seg)</Label>
            <Input
              id="repeticiones"
              type="number"
              value={faseActual.repeticiones}
              onChange={(e) => handleChangeFase("repeticiones", parseInt(e.target.value) || 0)}
              min="0"
              className="h-8 sm:h-10"
            />
          </div>
          <div>
            <Label htmlFor="descanso" className="text-xs sm:text-sm">Descanso (seg)</Label>
            <Input
              id="descanso"
              type="number"
              value={faseActual.descanso}
              onChange={(e) => handleChangeFase("descanso", parseInt(e.target.value) || 0)}
              min="0"
              className="h-8 sm:h-10"
            />
          </div>
        </div>

        {/* Ejercicios de la fase */}
        <div className="space-y-3">
          <h5 className="font-medium text-sm sm:text-base">Ejercicios de esta fase:</h5>
          
          {faseActual.ejercicios.map((ejercicio, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 p-2 rounded gap-2">
              <span className="text-xs sm:text-sm">{ejercicio.numeroEjercicio}. {ejercicio.nombre}</span>
              <Button
                onClick={() => quitarEjercicio(index)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-xs"
              >
                Quitar
              </Button>
            </div>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="nombreEjercicio" className="text-xs sm:text-sm">Nombre del ejercicio</Label>
              <Input
                id="nombreEjercicio"
                value={ejercicioActual.nombre}
                onChange={(e) => handleChangeEjercicio("nombre", e.target.value)}
                placeholder="Ej: Flexiones"
                className="h-8 sm:h-10"
              />
            </div>
            <div>
              <Label htmlFor="descripcionEjercicio" className="text-xs sm:text-sm">Descripción</Label>
              <Input
                id="descripcionEjercicio"
                value={ejercicioActual.descripcion}
                onChange={(e) => handleChangeEjercicio("descripcion", e.target.value)}
                placeholder="Ej: 20 repeticiones"
                className="h-8 sm:h-10"
              />
            </div>
          </div>
          
          <Button onClick={agregarEjercicio} variant="outline" size="sm" className="w-full sm:w-auto text-xs">
            + Agregar Ejercicio
          </Button>
        </div>

        <Button onClick={agregarFase} className="w-full h-8 sm:h-10 text-xs sm:text-sm">
          + Agregar Fase
        </Button>
      </div>

      {/* Botón final */}
      {fases.length > 0 && (
        <Button onClick={configurar} className="w-full bg-green-500 hover:bg-green-600 h-8 sm:h-10 text-xs sm:text-sm">
          🚀 Iniciar Rutina Personalizada
        </Button>
      )}
    </div>
  )
}
