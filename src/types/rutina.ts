export interface Ejercicio {
    numeroEjercicio: number
    nombre: string
    descripcion: string
}

export interface FaseRutina {
    nombre: string
    preparacion: number
    ejercicios: Ejercicio[]   // ahora es un arreglo de objetos
    repeticiones: number
    descanso: number
    series: number
}
