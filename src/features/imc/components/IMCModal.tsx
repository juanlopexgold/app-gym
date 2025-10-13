import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getIMCCategoryDescription, getIMCCategoryColor, IMCategory } from "@/types/imc"

interface IMCModalProps {
  weight: number
  height: number
  imc: number
  category: IMCategory
  onSave: (notes?: string) => void
  onClose: () => void
}

export default function IMCModal({ weight, height, imc, category, onSave, onClose }: IMCModalProps) {
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    onSave(notes || undefined)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Guardar Medición de IMC
          </h3>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-4">
          {/* Resumen de la medición */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-3">
              Resumen de la medición:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Peso:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Altura:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">IMC:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{imc}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Categoría:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIMCCategoryColor(category)}`}>
                  {getIMCCategoryDescription(category)}
                </span>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Notas (opcional)
            </Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agrega notas sobre esta medición..."
              className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
