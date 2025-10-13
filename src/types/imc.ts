export interface IMCEntry {
  id: string
  date: string // YYYY-MM-DD
  weight: number // en kg
  height: number // en cm
  imc: number // calculado
  category: IMCategory
  notes?: string
  createdAt: string // ISO timestamp
}

export type IMCategory = 
  | 'bajo_peso'
  | 'peso_normal'
  | 'sobrepeso'
  | 'obesidad_grado_1'
  | 'obesidad_grado_2'
  | 'obesidad_grado_3'

export interface IMCStats {
  currentIMC: number
  currentCategory: IMCategory
  totalEntries: number
  weightChange: number // cambio desde el primer registro
  heightChange: number // cambio desde el primer registro
  averageIMC: number
  lastEntry?: IMCEntry
  firstEntry?: IMCEntry
}

export interface IMCChartData {
  date: string
  weight: number
  height: number
  imc: number
  category: IMCategory
}

// Función para calcular IMC
export function calculateIMC(weight: number, height: number): number {
  const heightInMeters = height / 100
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

// Función para determinar categoría de IMC
export function getIMCCategory(imc: number): IMCategory {
  if (imc < 18.5) return 'bajo_peso'
  if (imc < 25) return 'peso_normal'
  if (imc < 30) return 'sobrepeso'
  if (imc < 35) return 'obesidad_grado_1'
  if (imc < 40) return 'obesidad_grado_2'
  return 'obesidad_grado_3'
}

// Función para obtener descripción de la categoría
export function getIMCCategoryDescription(category: IMCategory): string {
  const descriptions = {
    bajo_peso: 'Bajo peso',
    peso_normal: 'Peso normal',
    sobrepeso: 'Sobrepeso',
    obesidad_grado_1: 'Obesidad grado I',
    obesidad_grado_2: 'Obesidad grado II',
    obesidad_grado_3: 'Obesidad grado III'
  }
  return descriptions[category]
}

// Función para obtener color de la categoría
export function getIMCCategoryColor(category: IMCategory): string {
  const colors = {
    bajo_peso: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    peso_normal: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    sobrepeso: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    obesidad_grado_1: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
    obesidad_grado_2: 'text-red-600 bg-red-50 dark:bg-red-900/20',
    obesidad_grado_3: 'text-red-800 bg-red-100 dark:bg-red-900/30'
  }
  return colors[category]
}
