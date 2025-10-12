import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Layout } from "@/components/layouts/Layout"

export default function IMCPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold">⚖️ Calculadora IMC</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <p className="text-sm sm:text-base text-slate-600">
              Ingresa tu peso y altura para calcular tu Índice de Masa Corporal.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Placeholder: pronto añadiremos el formulario y resultados.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
