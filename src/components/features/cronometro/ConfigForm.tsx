import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaseRutina, Ejercicio } from "@/types/rutina"

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
    setFaseActual({ ...faseActual, ejercicios: nuevos })
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
  }

  const guardarRutina = () => {
    if (fases.length > 0) {
      onConfigurar(fases)
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulario de fase */}
      <div className="space-y-4 border p-4 rounded-md bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Agregar Fase</h3>

        <div>
          <Label>Nombre de la fase</Label>
          <Input
            type="text"
            value={faseActual.nombre}
            onChange={(e) => handleChangeFase("nombre", e.target.value)}
          />
        </div>

        <div>
          <Label>Preparación (segundos)</Label>
          <Input
            type="number"
            value={faseActual.preparacion}
            onChange={(e) => handleChangeFase("preparacion", Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Repeticiones por ejercicio</Label>
          <Input
            type="number"
            value={faseActual.repeticiones}
            onChange={(e) => handleChangeFase("repeticiones", Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Descanso entre ejercicios (segundos)</Label>
          <Input
            type="number"
            value={faseActual.descanso}
            onChange={(e) => handleChangeFase("descanso", Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Series</Label>
          <Input
            type="number"
            value={faseActual.series}
            onChange={(e) => handleChangeFase("series", Number(e.target.value))}
          />
        </div>

        {/* Subformulario de ejercicios */}
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold mb-2">Agregar Ejercicio</h4>
          <div>
            <Label>Nombre del ejercicio</Label>
            <Input
              type="text"
              value={ejercicioActual.nombre}
              onChange={(e) => handleChangeEjercicio("nombre", e.target.value)}
            />
          </div>
          <div>
            <Label>Descripción</Label>
            <Input
              type="text"
              value={ejercicioActual.descripcion}
              onChange={(e) => handleChangeEjercicio("descripcion", e.target.value)}
            />
          </div>
          <Button type="button" onClick={agregarEjercicio} className="mt-2 w-full">
            Agregar Ejercicio
          </Button>

          {faseActual.ejercicios.length > 0 && (
            <ul className="list-disc pl-6 mt-2 text-slate-700">
              {faseActual.ejercicios.map((ej, i) => (
                <li key={i} className="flex justify-between">
                  <span>
                    {ej.numeroEjercicio}. {ej.nombre} – {ej.descripcion}
                  </span>
                  <Button variant="ghost" onClick={() => quitarEjercicio(i)}>
                    ❌
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button type="button" onClick={agregarFase} className="w-full mt-4">
          Agregar Fase
        </Button>
      </div>

      {/* Lista de fases agregadas */}
      {fases.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Fases agregadas</h3>
          <ul className="list-disc pl-6 text-slate-700">
            {fases.map((f, i) => (
              <li key={i}>
                <strong>{f.nombre}</strong> – {f.ejercicios.length} ejercicios × {f.repeticiones} reps, {f.series} series
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Guardar rutina */}
      <Button
        type="button"
        onClick={guardarRutina}
        disabled={fases.length === 0}
        className="w-full"
      >
        Guardar Rutina
      </Button>
    </div>
  )
}