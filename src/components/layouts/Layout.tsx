import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  onLogout?: () => void
}

export function Layout({ children, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header global */}
      <Header onLogout={onLogout} />

      {/* Contenido dinámico */}
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {children}
      </main>

      {/* Footer global */}
      <Footer />
    </div>
  )
}
