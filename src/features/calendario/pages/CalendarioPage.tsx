import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Layout } from "@/components/layouts/Layout"

export default function CalendarioPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card>
          <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">📅 Calendario de Entrenamientos</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  Marca tus entrenamientos y revisa tu historial de actividad.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Placeholder: pronto añadiremos el calendario interactivo.
                </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
