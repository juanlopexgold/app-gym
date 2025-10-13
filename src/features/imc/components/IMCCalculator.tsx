import { useState, useEffect } from "react"
import { Calculator, Scale, Ruler, TrendingUp, History, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IMCEntry, calculateIMC, getIMCCategory, getIMCCategoryDescription, getIMCCategoryColor } from "@/types/imc"
import { saveIMCEntry, generateIMCEntryId, getAllIMCEntries } from "@/lib/imcStorage"
import IMCModal from "./IMCModal"
import IMCStats from "./IMCStats"
import IMCChart from "./IMCChart"

export default function IMCCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [calculatedIMC, setCalculatedIMC] = useState<number | null>(null)
  const [category, setCategory] = useState<string>("")
  const [showModal, setShowModal] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [entries, setEntries] = useState<IMCEntry[]>([])

  // Cargar entradas existentes
  useEffect(() => {
    setEntries(getAllIMCEntries())
  }, [])

  // Calcular IMC cuando cambien los valores
  useEffect(() => {
    if (weight && height) {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      
      if (weightNum > 0 && heightNum > 0) {
        const imc = calculateIMC(weightNum, heightNum)
        const imcCategory = getIMCCategory(imc)
        
        setCalculatedIMC(imc)
        setCategory(getIMCCategoryDescription(imcCategory))
      }
    } else {
      setCalculatedIMC(null)
      setCategory("")
    }
  }, [weight, height])

  const handleCalculate = () => {
    if (!weight || !height) {
      alert('Por favor ingresa peso y altura')
      return
    }

    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    
    if (weightNum <= 0 || heightNum <= 0) {
      alert('Por favor ingresa valores válidos')
      return
    }

    const imc = calculateIMC(weightNum, heightNum)
    const imcCategory = getIMCCategory(imc)
    
    setCalculatedIMC(imc)
    setCategory(getIMCCategoryDescription(imcCategory))
  }

  const handleSaveEntry = () => {
    if (!weight || !height || !calculatedIMC) {
      alert('Por favor calcula el IMC primero')
      return
    }

    setShowModal(true)
  }

  const handleSaveToHistory = (notes?: string) => {
    if (!weight || !height || !calculatedIMC) return

    const entry: IMCEntry = {
      id: generateIMCEntryId(),
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(weight),
      height: parseFloat(height),
      imc: calculatedIMC,
      category: getIMCCategory(calculatedIMC),
      notes,
      createdAt: new Date().toISOString()
    }

    saveIMCEntry(entry)
    setEntries(getAllIMCEntries())
    setShowModal(false)
  }

  const clearForm = () => {
    setWeight("")
    setHeight("")
    setCalculatedIMC(null)
    setCategory("")
  }

  return (
    <div className="space-y-6">
      {/* Formulario de cálculo */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Calculadora de IMC
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peso */}
          <div>
            <Label htmlFor="weight" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Scale className="h-4 w-4 inline mr-1" />
              Peso (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="1"
              max="500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ej: 70.5"
              className="mt-1"
            />
          </div>

          {/* Altura */}
          <div>
            <Label htmlFor="height" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <Ruler className="h-4 w-4 inline mr-1" />
              Altura (cm)
            </Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              min="50"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ej: 175"
              className="mt-1"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={handleCalculate}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calcular IMC
          </Button>
          <Button
            onClick={clearForm}
            variant="outline"
            className="flex-1"
          >
            Limpiar
          </Button>
        </div>

        {/* Resultado */}
        {calculatedIMC && (
          <div className="mt-6 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Tu IMC es:</p>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {calculatedIMC}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getIMCCategoryColor(getIMCCategory(calculatedIMC))}`}>
                {category}
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleSaveEntry}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Guardar en Historial
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setShowStats(!showStats)}
          variant="outline"
          className="flex-1"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          {showStats ? 'Ocultar' : 'Ver'} Estadísticas
        </Button>
        <Button
          onClick={() => setShowStats(false)}
          variant="outline"
          className="flex-1"
        >
          <History className="h-4 w-4 mr-2" />
          Ver Historial ({entries.length})
        </Button>
      </div>

      {/* Estadísticas */}
      {showStats && (
        <div className="space-y-6">
          <IMCStats />
          <IMCChart />
        </div>
      )}

      {/* Modal para guardar entrada */}
      {showModal && (
        <IMCModal
          weight={parseFloat(weight)}
          height={parseFloat(height)}
          imc={calculatedIMC!}
          category={getIMCCategory(calculatedIMC!)}
          onSave={handleSaveToHistory}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
