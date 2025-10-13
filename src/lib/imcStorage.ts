import { IMCEntry, IMCStats, IMCChartData } from "@/types/imc"

const STORAGE_KEY = "imcEntries"

// Obtener todas las entradas de IMC
export function getAllIMCEntries(): IMCEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

// Guardar una entrada de IMC
export function saveIMCEntry(entry: IMCEntry): void {
  const entries = getAllIMCEntries()
  const existingIndex = entries.findIndex(e => e.id === entry.id)
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry
  } else {
    entries.push(entry)
  }
  
  // Ordenar por fecha (más reciente primero)
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

// Eliminar una entrada de IMC
export function deleteIMCEntry(id: string): void {
  const entries = getAllIMCEntries()
  const filtered = entries.filter(e => e.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// Obtener entradas por rango de fechas
export function getIMCEntriesByDateRange(startDate: string, endDate: string): IMCEntry[] {
  const entries = getAllIMCEntries()
  return entries.filter(e => e.date >= startDate && e.date <= endDate)
}

// Generar ID único
export function generateIMCEntryId(): string {
  return `imc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Calcular estadísticas de IMC
export function calculateIMCStats(): IMCStats {
  const entries = getAllIMCEntries()
  
  if (entries.length === 0) {
    return {
      currentIMC: 0,
      currentCategory: 'peso_normal',
      totalEntries: 0,
      weightChange: 0,
      heightChange: 0,
      averageIMC: 0
    }
  }

  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const firstEntry = sortedEntries[0]
  const lastEntry = sortedEntries[sortedEntries.length - 1]
  
  const currentIMC = lastEntry.imc
  const currentCategory = lastEntry.category
  
  const weightChange = lastEntry.weight - firstEntry.weight
  const heightChange = lastEntry.height - firstEntry.height
  
  const averageIMC = entries.reduce((sum, entry) => sum + entry.imc, 0) / entries.length

  return {
    currentIMC,
    currentCategory,
    totalEntries: entries.length,
    weightChange: Math.round(weightChange * 10) / 10,
    heightChange: Math.round(heightChange * 10) / 10,
    averageIMC: Math.round(averageIMC * 10) / 10,
    lastEntry,
    firstEntry
  }
}

// Obtener datos para gráficos
export function getIMCChartData(): IMCChartData[] {
  const entries = getAllIMCEntries()
  return entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: entry.date,
      weight: entry.weight,
      height: entry.height,
      imc: entry.imc,
      category: entry.category
    }))
}

// Obtener entradas del último mes
export function getLastMonthEntries(): IMCEntry[] {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const startDate = lastMonth.toISOString().split('T')[0]
  const endDate = now.toISOString().split('T')[0]
  
  return getIMCEntriesByDateRange(startDate, endDate)
}

// Obtener entradas del último año
export function getLastYearEntries(): IMCEntry[] {
  const now = new Date()
  const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  const startDate = lastYear.toISOString().split('T')[0]
  const endDate = now.toISOString().split('T')[0]
  
  return getIMCEntriesByDateRange(startDate, endDate)
}
