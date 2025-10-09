import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  onLogout?: () => void
}

export default function Layout({ children, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header global */}
      <Header onLogout={onLogout} />

      {/* Contenido dinámico */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer global */}
      <Footer />
    </div>
  )
}
