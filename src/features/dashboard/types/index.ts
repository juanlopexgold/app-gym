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

export interface Entrenamiento {
  fecha: string // ISO string
  rutina: string
  duracion: number // en minutos
  playlist?: string
}

export interface Playlist {
  id: string
  nombre: string
  canciones: string[]
  tipo: 'youtube' | 'local'
}
