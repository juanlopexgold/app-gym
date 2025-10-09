import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Layout from "@/components/layout/Layout"

export default function Calendario() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">📅 Calendario de Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">
              Aquí podrás marcar tus entrenamientos y visualizar tu historial.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Placeholder: pronto añadiremos un calendario interactivo.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}