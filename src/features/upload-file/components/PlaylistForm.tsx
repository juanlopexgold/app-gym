import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Playlist } from "../types"
import { saveSong, getAllSongs } from "@/lib/db"

function extraerVideoId(url: string): string | null {
    try {
        const u = new URL(url)
        if (u.hostname.includes("youtu.be")) {
            const id = u.pathname.split("/").filter(Boolean)[0]
            return id && id.length === 11 ? id : null
        }
        if (u.hostname.includes("youtube.com")) {
            const id = u.searchParams.get("v")
            return id && id.length === 11 ? id : null
        }
        return null
    } catch {
        return null
    }
}

interface PlaylistFormProps {
    onSelect: (playlist: Playlist) => void
}

export default function PlaylistForm({ onSelect }: PlaylistFormProps) {
    const [nombre, setNombre] = useState("")
    const [cancion, setCancion] = useState("")
    const [archivo, setArchivo] = useState<File | null>(null)
    const [canciones, setCanciones] = useState<string[]>([])
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [editIndex, setEditIndex] = useState<number | null>(null)

    useEffect(() => {
        const data = localStorage.getItem("playlists")
        if (data) setPlaylists(JSON.parse(data))

        // Recuperar canciones guardadas en IndexedDB
        const cargar = async () => {
            const songs = await getAllSongs()
            const urls = songs.map((s) => URL.createObjectURL(s.blob))
            // Opcional: podrías integrarlas a una playlist "Local"
            if (urls.length > 0) {
                setPlaylists((prev) => [...prev, { id: "local", nombre: "Archivos Locales", canciones: urls, tipo: 'local' }])
            }
        }
        cargar()
    }, [])

    const agregarCancion = () => {
        if (!cancion) return
        const id = extraerVideoId(cancion)
        if (id) {
            setCanciones([...canciones, `yt:${id}`])
        } else {
            setCanciones([...canciones, cancion])
        }
        setCancion("")
    }

    const quitarCancion = (index: number) => {
        setCanciones(canciones.filter((_, i) => i !== index))
    }

    const guardarPlaylist = () => {
        if (!nombre || canciones.length === 0) return
        const nueva: Playlist = {
            id: Date.now().toString(),
            nombre,
            canciones,
            tipo: canciones.some(c => c.startsWith('yt:')) ? 'youtube' : 'local'
        }
        const actualizadas = [...playlists, nueva]
        setPlaylists(actualizadas)
        localStorage.setItem("playlists", JSON.stringify(actualizadas))
        setNombre("")
        setCanciones([])
    }

    const subirArchivo = async () => {
        if (!archivo) return
        try {
            const id = await saveSong(archivo)
            const url = URL.createObjectURL(archivo)
            setCanciones([...canciones, url])
            setArchivo(null)
        } catch (error) {
            console.error("Error al subir archivo:", error)
        }
    }

    const editarPlaylist = (index: number) => {
        const playlist = playlists[index]
        setNombre(playlist.nombre)
        setCanciones(playlist.canciones)
        setEditIndex(index)
    }

    const actualizarPlaylist = () => {
        if (!nombre || canciones.length === 0 || editIndex === null) return
        const actualizadas = [...playlists]
        actualizadas[editIndex] = {
            ...actualizadas[editIndex],
            nombre,
            canciones,
            tipo: canciones.some(c => c.startsWith('yt:')) ? 'youtube' : 'local'
        }
        setPlaylists(actualizadas)
        localStorage.setItem("playlists", JSON.stringify(actualizadas))
        setNombre("")
        setCanciones([])
        setEditIndex(null)
    }

    const eliminarPlaylist = (index: number) => {
        const actualizadas = playlists.filter((_, i) => i !== index)
        setPlaylists(actualizadas)
        localStorage.setItem("playlists", JSON.stringify(actualizadas))
    }

    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">🎵 Gestión de Playlists</h3>

            {/* Lista de playlists existentes */}
            {playlists.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">Playlists guardadas:</h4>
                    {playlists.map((playlist, index) => (
                        <div key={playlist.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-100 p-2 sm:p-3 rounded gap-2">
                            <div className="flex-1">
                                <span className="font-medium text-xs sm:text-sm">{playlist.nombre}</span>
                                <span className="text-xs sm:text-sm text-slate-500 ml-2">({playlist.canciones.length} canciones)</span>
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
                                <Button
                                    onClick={() => onSelect(playlist)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs flex-1 sm:flex-none"
                                >
                                    Seleccionar
                                </Button>
                                <Button
                                    onClick={() => editarPlaylist(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs flex-1 sm:flex-none"
                                >
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => eliminarPlaylist(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs flex-1 sm:flex-none"
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Formulario de nueva playlist */}
            <div className="border rounded p-3 sm:p-4 space-y-3 sm:space-y-4">
                <h4 className="font-medium text-sm sm:text-base">
                    {editIndex !== null ? "Editar Playlist" : "Nueva Playlist"}
                </h4>
                
                <div>
                    <Label htmlFor="nombre" className="text-xs sm:text-sm">Nombre de la playlist</Label>
                    <Input
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Música para entrenar"
                        className="h-8 sm:h-10"
                    />
                </div>

                {/* Agregar canción por URL */}
                <div>
                    <Label htmlFor="cancion" className="text-xs sm:text-sm">URL de canción (YouTube o archivo de audio)</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            id="cancion"
                            value={cancion}
                            onChange={(e) => setCancion(e.target.value)}
                            placeholder="https://youtube.com/watch?v=... o URL de archivo"
                            className="h-8 sm:h-10"
                        />
                        <Button onClick={agregarCancion} variant="outline" className="h-8 sm:h-10 text-xs">
                            Agregar
                        </Button>
                    </div>
                </div>

                {/* Subir archivo local */}
                <div>
                    <Label htmlFor="archivo" className="text-xs sm:text-sm">O subir archivo de audio</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                            id="archivo"
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                            className="h-8 sm:h-10"
                        />
                        <Button onClick={subirArchivo} variant="outline" disabled={!archivo} className="h-8 sm:h-10 text-xs">
                            Subir
                        </Button>
                    </div>
                </div>

                {/* Lista de canciones */}
                {canciones.length > 0 && (
                    <div className="space-y-2">
                        <h5 className="font-medium text-sm sm:text-base">Canciones en la playlist:</h5>
                        {canciones.map((cancion, index) => (
                            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 p-2 rounded gap-2">
                                <span className="text-xs sm:text-sm flex-1 break-all">
                                    {cancion.startsWith("yt:") ? `YouTube: ${cancion.slice(3)}` : cancion}
                                </span>
                                <Button
                                    onClick={() => quitarCancion(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs w-full sm:w-auto"
                                >
                                    Quitar
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <Button
                    onClick={editIndex !== null ? actualizarPlaylist : guardarPlaylist}
                    className="w-full h-8 sm:h-10 text-xs sm:text-sm"
                    disabled={!nombre || canciones.length === 0}
                >
                    {editIndex !== null ? "Actualizar Playlist" : "Guardar Playlist"}
                </Button>
            </div>
        </div>
    )
}
