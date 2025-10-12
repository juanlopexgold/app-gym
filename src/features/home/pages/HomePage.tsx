import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, Calendar, Activity, Dumbbell } from "lucide-react"
import { Layout } from "@/components/layouts/Layout"

interface HomePageProps {
  onLogout?: () => void
}

export default function HomePage({ onLogout }: HomePageProps) {
  return (
    <Layout onLogout={onLogout}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
            💪 Bienvenido a FitChrono
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Tu asistente de entrenamiento inteligente: controla tus rutinas, mide tu progreso y alcanza tus objetivos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">Cronómetro</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Configura fases de preparación, entrenamiento y descanso.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">Calendario</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Marca tus entrenamientos y revisa tu historial.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">IMC</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Calcula tu IMC semanal y guarda métricas de salud.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">Rutinas</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Administra tus rutinas por día y grupo muscular.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
