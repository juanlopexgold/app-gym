import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, Calendar, Activity, Dumbbell } from "lucide-react"
import Layout from "@/components/layout/Layout"

interface HomeProps {
  onLogout?: () => void
}

export default function Home({ onLogout }: HomeProps) {
  return (
    <Layout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            💪 Bienvenido a FitChrono
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tu asistente de entrenamiento inteligente: controla tus rutinas, mide tu progreso y alcanza tus objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Timer className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Cronómetro</CardTitle>
              <CardDescription>
                Configura fases de preparación, entrenamiento y descanso.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Calendario</CardTitle>
              <CardDescription>
                Marca tus entrenamientos y revisa tu historial.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>IMC</CardTitle>
              <CardDescription>
                Calcula tu IMC semanal y guarda métricas de salud.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rutinas</CardTitle>
              <CardDescription>
                Administra tus rutinas por día y grupo muscular.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
