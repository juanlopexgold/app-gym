import { Layout } from "@/components/layouts/Layout"
import IMCCalculator from "../components/IMCCalculator"

export default function IMCPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            ⚖️ Calculadora de IMC
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1">
            Calcula tu Índice de Masa Corporal y lleva un seguimiento de tu progreso
          </p>
        </div>

        {/* Calculadora */}
        <IMCCalculator />
      </div>
    </Layout>
  )
}
