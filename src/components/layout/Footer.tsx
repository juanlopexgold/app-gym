export default function Footer() {
    return (
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 py-4 mt-8">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FitChrono. Todos los derechos reservados.</p>
          <p className="text-xs text-slate-400">Tu asistente de entrenamiento inteligente</p>
        </div>
      </footer>
    )
  }
  