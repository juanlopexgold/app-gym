export interface Ejercicio {
  numeroEjercicio: number
  nombre: string
  descripcion: string
}

export interface FaseRutina {
  nombre: string
  preparacion: number
  ejercicios: Ejercicio[]
  repeticiones: number
  descanso: number
  series: number
}

export type NivelRutina = 'principiante' | 'intermedio' | 'avanzado' | 'intenso'
export type GrupoMuscular = 'pierna_gluteos' | 'brazos' | 'espalda' | 'pecho' | 'hombros' | 'core' | 'cardio' | 'full_body'

export interface RutinaDia {
  dia: number
  tipo: 'entrenamiento' | 'descanso'
  grupoMuscular?: GrupoMuscular
  fases: FaseRutina[]
  duracionEstimada: number // en minutos
  dificultad: number // 1-5
  descripcion: string
}

export interface Rutina30Dias {
  id: string
  nombre: string
  nivel: NivelRutina
  grupoMuscular: GrupoMuscular
  descripcion: string
  duracionTotal: number // en días
  dias: RutinaDia[]
  objetivos: string[]
  requisitos: string[]
  progresion: {
    semana1: string
    semana2: string
    semana3: string
    semana4: string
  }
}

export interface PlanCompleto {
  id: string
  nombre: string
  nivel: NivelRutina
  descripcion: string
  rutinas: {
    [key in GrupoMuscular]?: Rutina30Dias
  }
  duracionTotal: number
  objetivos: string[]
  requisitos: string[]
}

export interface ProgresoRutina {
  rutinaId: string
  diaActual: number
  fechaInicio: string
  diasCompletados: number[]
  diasPerdidos: number[]
  estadisticas: {
    tiempoTotal: number
    caloriasQuemadas: number
    ejerciciosCompletados: number
  }
}
