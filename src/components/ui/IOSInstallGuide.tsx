import { X, Share, Plus } from "lucide-react"
import { Button } from "./button"

interface IOSInstallGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function IOSInstallGuide({ isOpen, onClose }: IOSInstallGuideProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            📱 Instalar en iPhone/iPad
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share className="h-8 w-8 text-primary" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Sigue estos pasos para instalar FitChrono en tu pantalla de inicio:
            </p>
          </div>

          <div className="space-y-4">
            {/* Paso 1 */}
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Toca el botón de compartir
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  En la parte inferior de Safari, toca el ícono de compartir
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Selecciona "Agregar a pantalla de inicio"
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Desplázate hacia abajo y toca "Agregar a pantalla de inicio"
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Confirma la instalación
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Toca "Agregar" para instalar la app en tu pantalla de inicio
                </p>
              </div>
            </div>
          </div>

          {/* Visual guide */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Share className="h-4 w-4" />
              <span>→</span>
              <Plus className="h-4 w-4" />
              <span>→</span>
              <span>📱</span>
            </div>
            <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-2">
              Compartir → Agregar a pantalla de inicio → ¡Listo!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-slate-200 dark:border-slate-700">
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
            Entendido
          </Button>
        </div>
      </div>
    </div>
  )
}
