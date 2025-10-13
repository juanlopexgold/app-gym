import { Rutina30Dias, PlanCompleto, NivelRutina, GrupoMuscular } from '@/types/rutinaCompleta'

// ===== RUTINAS PRINCIPIANTE =====

export const rutinaPrincipiantePiernas: Rutina30Dias = {
  id: 'principiante_piernas',
  nombre: 'Piernas y Glúteos - Principiante',
  nivel: 'principiante',
  grupoMuscular: 'pierna_gluteos',
  descripcion: 'Rutina básica para fortalecer piernas y glúteos, perfecta para comenzar',
  duracionTotal: 30,
  objetivos: ['Fortalecer músculos de piernas', 'Mejorar resistencia', 'Tonificar glúteos'],
  requisitos: ['Sin experiencia previa necesaria', 'Espacio para moverse', 'Ropa cómoda'],
  progresion: {
    semana1: 'Adaptación y aprendizaje de movimientos básicos',
    semana2: 'Aumento gradual de intensidad y repeticiones',
    semana3: 'Consolidación de técnica y resistencia',
    semana4: 'Preparación para nivel intermedio'
  },
  dias: [
    // Día 1 - Entrenamiento
    {
      dia: 1,
      tipo: 'entrenamiento',
      grupoMuscular: 'pierna_gluteos',
      duracionEstimada: 25,
      dificultad: 2,
      descripcion: 'Primer día de adaptación con ejercicios básicos',
      fases: [
        {
          nombre: '🔥 Calentamiento',
          preparacion: 15,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Caminata en el lugar', descripcion: '2 minutos' },
            { numeroEjercicio: 2, nombre: 'Círculos de cadera', descripcion: '30 segundos' },
            { numeroEjercicio: 3, nombre: 'Elevaciones de rodillas', descripcion: '30 segundos' }
          ],
          repeticiones: 30,
          descanso: 10,
          series: 2
        },
        {
          nombre: '💪 Ejercicios Principales',
          preparacion: 20,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Sentadillas básicas', descripcion: '10 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Zancadas estáticas', descripcion: '8 por pierna' },
            { numeroEjercicio: 3, nombre: 'Puente de glúteo', descripcion: '12 repeticiones' }
          ],
          repeticiones: 45,
          descanso: 30,
          series: 3
        },
        {
          nombre: '🧘 Estiramiento',
          preparacion: 10,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Estiramiento de cuádriceps', descripcion: '20 segundos por pierna' },
            { numeroEjercicio: 2, nombre: 'Estiramiento de glúteos', descripcion: '20 segundos por pierna' }
          ],
          repeticiones: 20,
          descanso: 10,
          series: 2
        }
      ]
    },
    // Día 2 - Descanso
    {
      dia: 2,
      tipo: 'descanso',
      duracionEstimada: 0,
      dificultad: 0,
      descripcion: 'Día de descanso activo - caminata ligera recomendada',
      fases: []
    },
    // Día 3 - Entrenamiento
    {
      dia: 3,
      tipo: 'entrenamiento',
      grupoMuscular: 'pierna_gluteos',
      duracionEstimada: 30,
      dificultad: 2,
      descripcion: 'Segundo entrenamiento con progresión ligera',
      fases: [
        {
          nombre: '🔥 Calentamiento',
          preparacion: 15,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Jumping jacks suaves', descripcion: '30 segundos' },
            { numeroEjercicio: 2, nombre: 'Sentadillas sin peso', descripcion: '10 repeticiones' },
            { numeroEjercicio: 3, nombre: 'Círculos de tobillos', descripcion: '30 segundos' }
          ],
          repeticiones: 30,
          descanso: 10,
          series: 2
        },
        {
          nombre: '💪 Ejercicios Principales',
          preparacion: 25,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Sentadillas con pausa', descripcion: '12 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Zancadas alternadas', descripcion: '10 por pierna' },
            { numeroEjercicio: 3, nombre: 'Puente de glúteo con elevación', descripcion: '15 repeticiones' },
            { numeroEjercicio: 4, nombre: 'Elevaciones de talón', descripcion: '20 repeticiones' }
          ],
          repeticiones: 50,
          descanso: 30,
          series: 3
        },
        {
          nombre: '🧘 Estiramiento',
          preparacion: 10,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Estiramiento de isquiotibiales', descripcion: '20 segundos' },
            { numeroEjercicio: 2, nombre: 'Estiramiento de pantorrillas', descripcion: '20 segundos por pierna' }
          ],
          repeticiones: 20,
          descanso: 10,
          series: 2
        }
      ]
    },
    // Día 4 - Descanso
    {
      dia: 4,
      tipo: 'descanso',
      duracionEstimada: 0,
      dificultad: 0,
      descripcion: 'Día de descanso - hidratación y alimentación balanceada',
      fases: []
    }
    // ... continuaría con los 26 días restantes
  ]
}

export const rutinaPrincipianteBrazos: Rutina30Dias = {
  id: 'principiante_brazos',
  nombre: 'Brazos - Principiante',
  nivel: 'principiante',
  grupoMuscular: 'brazos',
  descripcion: 'Rutina básica para fortalecer brazos, bíceps y tríceps',
  duracionTotal: 30,
  objetivos: ['Fortalecer brazos', 'Mejorar tono muscular', 'Aumentar resistencia'],
  requisitos: ['Sin experiencia previa', 'Botellas de agua como peso opcional'],
  progresion: {
    semana1: 'Movimientos básicos y adaptación',
    semana2: 'Aumento de repeticiones',
    semana3: 'Mejora de técnica',
    semana4: 'Consolidación y preparación para intermedio'
  },
  dias: [
    {
      dia: 1,
      tipo: 'entrenamiento',
      grupoMuscular: 'brazos',
      duracionEstimada: 20,
      dificultad: 2,
      descripcion: 'Primer día enfocado en movimientos básicos de brazos',
      fases: [
        {
          nombre: '🔥 Calentamiento',
          preparacion: 10,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Círculos de brazos', descripcion: '30 segundos' },
            { numeroEjercicio: 2, nombre: 'Movimientos de hombros', descripcion: '30 segundos' }
          ],
          repeticiones: 30,
          descanso: 10,
          series: 2
        },
        {
          nombre: '💪 Ejercicios Principales',
          preparacion: 20,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Flexiones de rodillas', descripcion: '8 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Curls de bíceps (sin peso)', descripcion: '12 repeticiones' },
            { numeroEjercicio: 3, nombre: 'Extensiones de tríceps', descripcion: '10 repeticiones' }
          ],
          repeticiones: 40,
          descanso: 30,
          series: 3
        }
      ]
    },
    {
      dia: 2,
      tipo: 'descanso',
      duracionEstimada: 0,
      dificultad: 0,
      descripcion: 'Descanso para recuperación muscular',
      fases: []
    }
    // ... más días
  ]
}

// ===== RUTINAS INTERMEDIO =====

export const rutinaIntermedioFullBody: Rutina30Dias = {
  id: 'intermedio_fullbody',
  nombre: 'Full Body - Intermedio',
  nivel: 'intermedio',
  grupoMuscular: 'full_body',
  descripcion: 'Rutina completa que trabaja todo el cuerpo con mayor intensidad',
  duracionTotal: 30,
  objetivos: ['Fortalecimiento general', 'Mejora de resistencia', 'Quema de grasa'],
  requisitos: ['Experiencia básica en ejercicios', 'Buena condición física base'],
  progresion: {
    semana1: 'Adaptación a mayor intensidad',
    semana2: 'Aumento de volumen de entrenamiento',
    semana3: 'Introducción de ejercicios más complejos',
    semana4: 'Consolidación y preparación para avanzado'
  },
  dias: [
    {
      dia: 1,
      tipo: 'entrenamiento',
      grupoMuscular: 'full_body',
      duracionEstimada: 45,
      dificultad: 3,
      descripcion: 'Entrenamiento completo de cuerpo entero',
      fases: [
        {
          nombre: '🔥 Calentamiento Dinámico',
          preparacion: 15,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Jumping jacks', descripcion: '45 segundos' },
            { numeroEjercicio: 2, nombre: 'Sentadillas dinámicas', descripcion: '30 segundos' },
            { numeroEjercicio: 3, nombre: 'Flexiones dinámicas', descripcion: '30 segundos' }
          ],
          repeticiones: 45,
          descanso: 15,
          series: 2
        },
        {
          nombre: '💪 Bloque 1 - Fuerza',
          preparacion: 30,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Sentadillas con salto', descripcion: '15 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Flexiones estándar', descripcion: '12 repeticiones' },
            { numeroEjercicio: 3, nombre: 'Zancadas alternadas', descripcion: '12 por pierna' }
          ],
          repeticiones: 60,
          descanso: 30,
          series: 4
        },
        {
          nombre: '⚡ Bloque 2 - Cardio',
          preparacion: 25,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Burpees', descripcion: '10 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Mountain climbers', descripcion: '30 segundos' },
            { numeroEjercicio: 3, nombre: 'Jump squats', descripcion: '15 repeticiones' }
          ],
          repeticiones: 45,
          descanso: 20,
          series: 3
        },
        {
          nombre: '🧘 Estiramiento',
          preparacion: 15,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Estiramiento completo', descripcion: '5 minutos' }
          ],
          repeticiones: 60,
          descanso: 10,
          series: 1
        }
      ]
    },
    {
      dia: 2,
      tipo: 'descanso',
      duracionEstimada: 0,
      dificultad: 0,
      descripcion: 'Descanso activo - caminata o estiramientos ligeros',
      fases: []
    }
    // ... más días
  ]
}

// ===== RUTINAS AVANZADO =====

export const rutinaAvanzadoIntenso: Rutina30Dias = {
  id: 'avanzado_intenso',
  nombre: 'Entrenamiento Intenso - Avanzado',
  nivel: 'avanzado',
  grupoMuscular: 'full_body',
  descripcion: 'Rutina de alta intensidad para atletas experimentados',
  duracionTotal: 30,
  objetivos: ['Máxima intensidad', 'Mejora de rendimiento', 'Preparación atlética'],
  requisitos: ['Experiencia avanzada', 'Excelente condición física', 'Sin lesiones'],
  progresion: {
    semana1: 'Adaptación a alta intensidad',
    semana2: 'Aumento de volumen extremo',
    semana3: 'Picos de intensidad máxima',
    semana4: 'Recuperación y supercompensación'
  },
  dias: [
    {
      dia: 1,
      tipo: 'entrenamiento',
      grupoMuscular: 'full_body',
      duracionEstimada: 60,
      dificultad: 5,
      descripcion: 'Entrenamiento de máxima intensidad',
      fases: [
        {
          nombre: '🔥 Calentamiento Intenso',
          preparacion: 20,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Burpees explosivos', descripcion: '20 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Jump squats', descripcion: '30 segundos' },
            { numeroEjercicio: 3, nombre: 'Mountain climbers rápidos', descripcion: '45 segundos' }
          ],
          repeticiones: 60,
          descanso: 10,
          series: 2
        },
        {
          nombre: '💥 Bloque 1 - HIIT Extremo',
          preparacion: 40,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Burpees con salto', descripcion: '45 segundos' },
            { numeroEjercicio: 2, nombre: 'Jump squats profundos', descripcion: '45 segundos' },
            { numeroEjercicio: 3, nombre: 'Mountain climbers', descripcion: '45 segundos' },
            { numeroEjercicio: 4, nombre: 'Flexiones explosivas', descripcion: '45 segundos' }
          ],
          repeticiones: 45,
          descanso: 15,
          series: 5
        },
        {
          nombre: '🧨 Bloque 2 - Fuerza Explosiva',
          preparacion: 35,
          ejercicios: [
            { numeroEjercicio: 1, nombre: 'Plyometric push-ups', descripcion: '15 repeticiones' },
            { numeroEjercicio: 2, nombre: 'Jump lunges', descripcion: '20 repeticiones' },
            { numeroEjercicio: 3, nombre: 'Clapping push-ups', descripcion: '10 repeticiones' }
          ],
          repeticiones: 60,
          descanso: 30,
          series: 4
        }
      ]
    },
    {
      dia: 2,
      tipo: 'descanso',
      duracionEstimada: 0,
      dificultad: 0,
      descripcion: 'Descanso completo - recuperación total',
      fases: []
    }
    // ... más días
  ]
}

// ===== PLANES COMPLETOS =====

export const planPrincipiante: PlanCompleto = {
  id: 'plan_principiante',
  nombre: 'Plan Completo - Principiante',
  nivel: 'principiante',
  descripcion: 'Plan integral de 30 días para principiantes con rutinas por grupos musculares',
  duracionTotal: 30,
  objetivos: [
    'Adaptación al ejercicio regular',
    'Fortalecimiento muscular básico',
    'Mejora de resistencia cardiovascular',
    'Establecimiento de hábitos saludables'
  ],
  requisitos: [
    'Sin experiencia previa necesaria',
    'Espacio para ejercitarse',
    'Ropa cómoda',
    'Botellas de agua como peso opcional'
  ],
  rutinas: {
    pierna_gluteos: rutinaPrincipiantePiernas,
    brazos: rutinaPrincipianteBrazos
    // Se pueden agregar más rutinas aquí
  }
}

export const planIntermedio: PlanCompleto = {
  id: 'plan_intermedio',
  nombre: 'Plan Completo - Intermedio',
  nivel: 'intermedio',
  descripcion: 'Plan integral de 30 días para nivel intermedio con mayor intensidad',
  duracionTotal: 30,
  objetivos: [
    'Mejora significativa de fuerza',
    'Aumento de masa muscular',
    'Mejora de resistencia avanzada',
    'Quema de grasa efectiva'
  ],
  requisitos: [
    'Experiencia básica en ejercicios',
    'Buena condición física base',
    'Conocimiento de técnica básica'
  ],
  rutinas: {
    full_body: rutinaIntermedioFullBody
    // Se pueden agregar más rutinas aquí
  }
}

export const planAvanzado: PlanCompleto = {
  id: 'plan_avanzado',
  nombre: 'Plan Completo - Avanzado',
  nivel: 'avanzado',
  descripcion: 'Plan integral de 30 días para atletas experimentados',
  duracionTotal: 30,
  objetivos: [
    'Máximo rendimiento atlético',
    'Fuerza explosiva',
    'Resistencia extrema',
    'Preparación competitiva'
  ],
  requisitos: [
    'Experiencia avanzada en entrenamiento',
    'Excelente condición física',
    'Sin lesiones activas',
    'Conocimiento técnico avanzado'
  ],
  rutinas: {
    full_body: rutinaAvanzadoIntenso
    // Se pueden agregar más rutinas aquí
  }
}

// ===== FUNCIONES UTILITARIAS =====

export function getRutinasPorNivel(nivel: NivelRutina): Rutina30Dias[] {
  const rutinas: { [key in NivelRutina]: Rutina30Dias[] } = {
    principiante: [rutinaPrincipiantePiernas, rutinaPrincipianteBrazos],
    intermedio: [rutinaIntermedioFullBody],
    avanzado: [rutinaAvanzadoIntenso],
    intenso: [rutinaAvanzadoIntenso] // Por ahora usamos la misma
  }
  
  return rutinas[nivel] || []
}

export function getRutinasPorGrupoMuscular(grupo: GrupoMuscular): Rutina30Dias[] {
  const todasLasRutinas = [
    rutinaPrincipiantePiernas,
    rutinaPrincipianteBrazos,
    rutinaIntermedioFullBody,
    rutinaAvanzadoIntenso
  ]
  
  return todasLasRutinas.filter(rutina => rutina.grupoMuscular === grupo)
}

export function getPlanesCompletos(): PlanCompleto[] {
  return [planPrincipiante, planIntermedio, planAvanzado]
}

export function getRutinaById(id: string): Rutina30Dias | undefined {
  const todasLasRutinas = [
    rutinaPrincipiantePiernas,
    rutinaPrincipianteBrazos,
    rutinaIntermedioFullBody,
    rutinaAvanzadoIntenso
  ]
  
  return todasLasRutinas.find(rutina => rutina.id === id)
}

export function getPlanById(id: string): PlanCompleto | undefined {
  const planes = getPlanesCompletos()
  return planes.find(plan => plan.id === id)
}
