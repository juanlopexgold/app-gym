import { Layout } from "@/components/layouts/Layout"
import { useState } from "react"
import Cronometro from "../components/Cronometro"
import {
  rutinaLunes,
  rutinaMartes,
  rutinaMiercoles,
  rutinaJueves,
  rutinaViernes,
  rutinaSabado,
  rutinaDomingo,
} from "@/lib/rutinas"
import ConfigForm from "../components/ConfigForm"
import PlaylistForm from "../../upload-file/components/PlaylistForm"
import EnhancedMusicPlayer from "../../upload-file/components/EnhancedMusicPlayer"
import { FaseRutina } from "../types"
import { Playlist } from "../../upload-file/types"
import Modal from "@/components/ui/Modal"
import { Button } from "@/components/ui/button"

export default function CronometroPage() {
  const [modo, setModo] = useState<"config" | "run">("config")
  const [rutina, setRutina] = useState<FaseRutina[]>([])
  const [mostrarRutinas, setMostrarRutinas] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [mostrarPlaylist, setMostrarPlaylist] = useState(false)
  const [playlistActiva, setPlaylistActiva] = useState<Playlist | null>(null)

  // 👉 Estado para el modal de resumen
  const [mostrarResumen, setMostrarResumen] = useState(false)
  const [resumen, setResumen] = useState<{ duracion: number; playlist?: string }>({
    duracion: 0,
    playlist: undefined,
  })

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-slate-800 dark:text-slate-100">⏱️ Cronómetro de Entrenamiento</h1>

        {modo === "config" ? (
          <>
                <p className="mb-4 sm:mb-6 text-slate-600 dark:text-slate-300 text-center text-sm sm:text-base px-4">
                  Selecciona tu rutina, configura una nueva o añade música para acompañar tu entrenamiento.
                </p>

            {/* Dropdown de rutinas predeterminadas */}
            <div className="mb-3 sm:mb-4">
              <button
                className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => setMostrarRutinas(!mostrarRutinas)}
              >
                <span className="truncate">Usar Rutina Predeterminada</span>
                <span className="ml-2 flex-shrink-0">{mostrarRutinas ? "▲" : "▼"}</span>
              </button>

                  {mostrarRutinas && (
                    <div className="mt-2 border rounded-lg p-2 sm:p-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg space-y-1 sm:space-y-2">
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaLunes); setModo("run") }}>Lunes – Pecho + Tríceps</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaMartes); setModo("run") }}>Martes – Piernas + Glúteos</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaMiercoles); setModo("run") }}>Miércoles – Espalda + Bíceps</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaJueves); setModo("run") }}>Jueves – Cardio HIIT + Core</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaViernes); setModo("run") }}>Viernes – Brazos intensos</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaSabado); setModo("run") }}>Sábado – Piernas + Glúteos</button>
                      <button className="w-full text-left px-2 py-1 sm:py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors" onClick={() => { setRutina(rutinaDomingo); setModo("run") }}>Domingo – Descanso activo</button>
                </div>
              )}
            </div>

            {/* Botón 2: dropdown que muestra/oculta el formulario de rutina */}
            <div className="mb-3 sm:mb-4">
              <button
                className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => setMostrarForm(!mostrarForm)}
              >
                <span className="truncate">Configurar nueva rutina</span>
                <span className="ml-2 flex-shrink-0">{mostrarForm ? "▲" : "▼"}</span>
              </button>

                  {mostrarForm && (
                    <div className="mt-3 sm:mt-4 border rounded p-3 sm:p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow">
                  <ConfigForm
                    onConfigurar={(fases: FaseRutina[]) => {
                      setRutina(fases)
                      setModo("run")
                    }}
                  />
                </div>
              )}
            </div>

            {/* Botón 3: dropdown para configurar playlist */}
            <div className="mb-3 sm:mb-4">
              <button
                className="bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => setMostrarPlaylist(!mostrarPlaylist)}
              >
                <span className="truncate">🎶 Configurar Playlist</span>
                <span className="ml-2 flex-shrink-0">{mostrarPlaylist ? "▲" : "▼"}</span>
              </button>

                  {mostrarPlaylist && (
                    <div className="mt-3 sm:mt-4 border rounded p-3 sm:p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow">
                  <PlaylistForm onSelect={(p: Playlist) => setPlaylistActiva(p)} />
                  {playlistActiva && (
                        <p className="mt-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
                          ✅ Playlist seleccionada: <strong>{playlistActiva.nombre}</strong>
                        </p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Columna izquierda: Cronómetro */}
                <div className="rounded-lg shadow-md p-4 sm:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Cronometro
                fases={rutina}
                onVolver={() => setModo("config")}
                onFinish={({ duracion }: { duracion: number }) => {
                  setResumen({ duracion, playlist: playlistActiva?.nombre })
                  setMostrarResumen(true)
                }}
              />
            </div>

            {/* Columna derecha: Playlist */}
            {playlistActiva && (
                  <div className="rounded-lg shadow-md p-4 sm:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <EnhancedMusicPlayer playlist={playlistActiva} />
              </div>
            )}
          </div>
        )}

        {/* Modal de resumen */}
        <Modal
          open={mostrarResumen}
          onClose={() => setMostrarResumen(false)}
          title="🎉 ¡Rutina completada!"
          description="Aquí tienes un resumen de tu entrenamiento"
          footer={
            <Button 
              onClick={() => setMostrarResumen(false)} 
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Cerrar
            </Button>
          }
        >
              <div className="space-y-2 text-sm sm:text-base text-slate-800 dark:text-slate-200">
                <p><strong>Duración:</strong> {resumen.duracion} min</p>
                {resumen.playlist && <p><strong>Playlist:</strong> {resumen.playlist}</p>}
                <p><strong>Calorías estimadas:</strong> {resumen.duracion * 7} kcal</p>
              </div>
        </Modal>
      </div>
    </Layout>
  )
}
