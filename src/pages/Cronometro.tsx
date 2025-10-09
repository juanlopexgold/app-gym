import Layout from "@/components/layout/Layout"
import { useState } from "react"
import Cronometro from "@/components/features/cronometro/Cronometro"
import {
  rutinaLunes,
  rutinaMartes,
  rutinaMiercoles,
  rutinaJueves,
  rutinaViernes,
  rutinaSabado,
  rutinaDomingo,
} from "@/lib/rutinas"
import ConfigForm from "@/components/features/cronometro/ConfigForm"
import PlaylistForm from "@/components/features/playlist/PlaylistForm"
import MusicPlayer from "@/components/features/playlist/MusicPlayer"
import { FaseRutina } from "@/types/rutina"
import { Playlist } from "@/types/playlist"

export default function CronometroPage() {
  const [modo, setModo] = useState<"config" | "run">("config")
  const [rutina, setRutina] = useState<FaseRutina[]>([])
  const [mostrarRutinas, setMostrarRutinas] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [mostrarPlaylist, setMostrarPlaylist] = useState(false)
  const [playlistActiva, setPlaylistActiva] = useState<Playlist | null>(null)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">⏱️ Cronómetro de Entrenamiento</h1>

        {modo === "config" ? (
          <>
            <p className="mb-6 text-slate-600 text-center">
              Selecciona tu rutina, configura una nueva o añade música para acompañar tu entrenamiento.
            </p>

            {/* Dropdown de rutinas predeterminadas */}
            <div className="mb-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded w-full flex justify-between items-center"
                onClick={() => setMostrarRutinas(!mostrarRutinas)}
              >
                Usar Rutina Predeterminada
                <span className="ml-2">{mostrarRutinas ? "▲" : "▼"}</span>
              </button>

              {mostrarRutinas && (
                <div className="mt-2 border rounded p-2 bg-white shadow space-y-2">
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaLunes); setModo("run") }}>Lunes – Pecho + Tríceps</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaMartes); setModo("run") }}>Martes – Piernas + Glúteos</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaMiercoles); setModo("run") }}>Miércoles – Espalda + Bíceps</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaJueves); setModo("run") }}>Jueves – Cardio HIIT + Core</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaViernes); setModo("run") }}>Viernes – Brazos intensos</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaSabado); setModo("run") }}>Sábado – Piernas + Glúteos</button>
                  <button className="w-full text-left px-2 py-1 hover:bg-slate-100" onClick={() => { setRutina(rutinaDomingo); setModo("run") }}>Domingo – Descanso activo</button>
                </div>
              )}
            </div>

            {/* Botón 2: dropdown que muestra/oculta el formulario de rutina */}
            <div className="mb-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded w-full flex justify-between items-center"
                onClick={() => setMostrarForm(!mostrarForm)}
              >
                Configurar nueva rutina
                <span className="ml-2">{mostrarForm ? "▲" : "▼"}</span>
              </button>

              {mostrarForm && (
                <div className="mt-4 border rounded p-4 bg-white shadow">
                  <ConfigForm
                    onConfigurar={(fases) => {
                      setRutina(fases)
                      setModo("run")
                    }}
                  />
                </div>
              )}
            </div>

            {/* Botón 3: dropdown para configurar playlist */}
            <div className="mb-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded w-full flex justify-between items-center"
                onClick={() => setMostrarPlaylist(!mostrarPlaylist)}
              >
                🎶 Configurar Playlist
                <span className="ml-2">{mostrarPlaylist ? "▲" : "▼"}</span>
              </button>

              {mostrarPlaylist && (
                <div className="mt-4 border rounded p-4 bg-white shadow">
                  <PlaylistForm onSelect={(p) => setPlaylistActiva(p)} />
                  {playlistActiva && (
                    <p className="mt-2 text-sm text-green-600">
                      ✅ Playlist seleccionada: <strong>{playlistActiva.nombre}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda: Cronómetro */}
            <div className="rounded-lg shadow-md p-6 bg-white">
              <Cronometro fases={rutina} onVolver={() => setModo("config")} />
            </div>

            {/* Columna derecha: Playlist */}
            {playlistActiva && (
              <div className="rounded-lg shadow-md p-6 bg-white flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    🎶 Playlist activa: {playlistActiva.nombre}
                  </h2>
                  <MusicPlayer playlist={playlistActiva} autoPlay />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}