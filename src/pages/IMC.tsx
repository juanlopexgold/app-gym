import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout/Layout"

export default function IMC() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">⚖️ Calculadora IMC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Ingresa tu peso y altura para calcular tu Índice de Masa Corporal.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Placeholder: pronto añadiremos el formulario y resultados.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}