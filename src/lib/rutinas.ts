import { FaseRutina } from "@/types/rutina"

const generarEjercicios = (base: string): { numeroEjercicio: number; nombre: string; descripcion: string }[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    numeroEjercicio: i + 1,
    nombre: `${base} ${i + 1}`,
    descripcion: `Descripción del ejercicio ${i + 1} de ${base}`,
  }))
}

export const rutinaLunes: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Pecho – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Pecho"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Tríceps – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Tríceps"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Pecho – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Pecho Avanzado"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaMartes: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Piernas – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Piernas"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Glúteos – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Glúteos"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Piernas – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Piernas Avanzado"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaMiercoles: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Espalda – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Espalda"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Bíceps – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Bíceps"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Espalda – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Espalda Avanzado"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaJueves: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Cardio HIIT – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Cardio HIIT"), repeticiones: 20, descanso: 15, series: 4 },
  { nombre: "Core – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Core"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Cardio HIIT – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Cardio Avanzado"), repeticiones: 20, descanso: 15, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaViernes: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Brazos – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Brazos"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Brazos – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Brazos Intensos"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Brazos – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Brazos Avanzado"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaSabado: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 10, ejercicios: generarEjercicios("Calentamiento"), repeticiones: 15, descanso: 15, series: 4 },
  { nombre: "Piernas – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Piernas"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Glúteos – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Glúteos"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Piernas – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Piernas Avanzado"), repeticiones: 12, descanso: 20, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento"), repeticiones: 10, descanso: 15, series: 4 },
]

export const rutinaDomingo: FaseRutina[] = [
  { nombre: "Calentamiento", preparacion: 5, ejercicios: generarEjercicios("Calentamiento Ligero"), repeticiones: 10, descanso: 10, series: 4 },
  { nombre: "Movilidad – Bloque 1", preparacion: 10, ejercicios: generarEjercicios("Movilidad"), repeticiones: 12, descanso: 15, series: 4 },
  { nombre: "Yoga – Bloque 2", preparacion: 10, ejercicios: generarEjercicios("Yoga"), repeticiones: 12, descanso: 15, series: 4 },
  { nombre: "Respiración – Bloque 3", preparacion: 10, ejercicios: generarEjercicios("Respiración"), repeticiones: 12, descanso: 15, series: 4 },
  { nombre: "Estiramiento", preparacion: 10, ejercicios: generarEjercicios("Estiramiento Suave"), repeticiones: 10, descanso: 15, series: 4 },
]
