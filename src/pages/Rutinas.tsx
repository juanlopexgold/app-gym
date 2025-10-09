import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Layout from "@/components/layout/Layout"

export default function Rutinas() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">🏋️ Rutinas</CardTitle>
            <CardDescription>
              Organiza tus rutinas por día y grupo muscular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Aquí podrás ver tus rutinas, crear nuevas, actualizarlas o eliminar las que ya no uses.
            </p>

            {/* Placeholder lista de rutinas */}
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold">Lunes – Pecho + Tríceps</h3>
                <p className="text-sm text-slate-500">4 ejercicios principales, 60 min</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold">Miércoles – Espalda + Bíceps</h3>
                <p className="text-sm text-slate-500">5 ejercicios principales, 85 min</p>
              </Card>
            </div>

            {/* Botón para crear nueva rutina */}
            <div className="mt-6">
              <Button className="flex items-center space-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>Nueva Rutina</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}