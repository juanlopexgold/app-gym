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
import MusicPlayer from "../../upload-file/components/MusicPlayer"
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">⏱️ Cronómetro de Entrenamiento</h1>

        {modo === "config" ? (
          <>
            <p className="mb-4 sm:mb-6 text-slate-600 text-center text-sm sm:text-base px-4">
              Selecciona tu rutina, configura una nueva o añade música para acompañar tu entrenamiento.
            </p>

            {/* Dropdown de rutinas predeterminadas */}
            <div className="mb-3 sm:mb-4">
              <button
                className="bg-primary text-white px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base"
                onClick={() => setMostrarRutinas(!mostrarRutinas)}
              >
                <span className="truncate">Usar Rutina Predeterminada</span>
                <span className="ml-2 flex-shrink-0">{mostrarRutinas ? "▲" : "▼"}</span>
              </button>

              {mostrarRutinas && (
                <div className="mt-2 border rounded p-2 sm:p-3 bg-white shadow space-y-1 sm:space-y-2">
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaLunes); setModo("run") }}>Lunes – Pecho + Tríceps</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaMartes); setModo("run") }}>Martes – Piernas + Glúteos</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaMiercoles); setModo("run") }}>Miércoles – Espalda + Bíceps</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaJueves); setModo("run") }}>Jueves – Cardio HIIT + Core</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaViernes); setModo("run") }}>Viernes – Brazos intensos</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaSabado); setModo("run") }}>Sábado – Piernas + Glúteos</button>
                  <button className="w-full text-left px-2 py-1 sm:py-2 hover:bg-slate-100 text-xs sm:text-sm" onClick={() => { setRutina(rutinaDomingo); setModo("run") }}>Domingo – Descanso activo</button>
                </div>
              )}
            </div>

            {/* Botón 2: dropdown que muestra/oculta el formulario de rutina */}
            <div className="mb-3 sm:mb-4">
              <button
                className="bg-primary text-white px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base"
                onClick={() => setMostrarForm(!mostrarForm)}
              >
                <span className="truncate">Configurar nueva rutina</span>
                <span className="ml-2 flex-shrink-0">{mostrarForm ? "▲" : "▼"}</span>
              </button>

              {mostrarForm && (
                <div className="mt-3 sm:mt-4 border rounded p-3 sm:p-4 bg-white shadow">
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
                className="bg-primary text-white px-3 sm:px-4 py-2 sm:py-3 rounded w-full flex justify-between items-center text-sm sm:text-base"
                onClick={() => setMostrarPlaylist(!mostrarPlaylist)}
              >
                <span className="truncate">🎶 Configurar Playlist</span>
                <span className="ml-2 flex-shrink-0">{mostrarPlaylist ? "▲" : "▼"}</span>
              </button>

              {mostrarPlaylist && (
                <div className="mt-3 sm:mt-4 border rounded p-3 sm:p-4 bg-white shadow">
                  <PlaylistForm onSelect={(p: Playlist) => setPlaylistActiva(p)} />
                  {playlistActiva && (
                    <p className="mt-2 text-xs sm:text-sm text-green-600">
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
            <div className="rounded-lg shadow-md p-4 sm:p-6 bg-white">
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
              <div className="rounded-lg shadow-md p-4 sm:p-6 bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">
                    🎶 Playlist activa: {playlistActiva.nombre}
                  </h2>
                  <MusicPlayer playlist={playlistActiva} autoPlay />
                </div>
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
            <Button onClick={() => setMostrarResumen(false)} className="bg-green-500 text-white">
              Cerrar
            </Button>
          }
        >
          <div className="space-y-2 text-sm sm:text-base">
            <p><strong>Duración:</strong> {resumen.duracion} min</p>
            {resumen.playlist && <p><strong>Playlist:</strong> {resumen.playlist}</p>}
            <p><strong>Calorías estimadas:</strong> {resumen.duracion * 7} kcal</p>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}
