import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Playlist } from "@/types/playlist"
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
                setPlaylists((prev) => [...prev, { nombre: "Archivos Locales", canciones: urls }])
            }
        }
        cargar()
    }, [])

    const persistir = (listas: Playlist[]) => {
        setPlaylists(listas)
        localStorage.setItem("playlists", JSON.stringify(listas))
    }

    const agregarCancion = async () => {
        if (archivo) {
            await saveSong(archivo) // ya no usamos { name }
            const urlLocal = URL.createObjectURL(archivo)
            setCanciones([...canciones, urlLocal])
            setArchivo(null)
            return
        }
        if (!cancion.trim()) return
        const videoId = extraerVideoId(cancion.trim())
        if (videoId) {
            setCanciones([...canciones, `yt:${videoId}`])
        } else {
            setCanciones([...canciones, cancion.trim()])
        }
        setCancion("")
    }

    const quitarCancion = (i: number) => {
        setCanciones(canciones.filter((_, idx) => idx !== i))
    }

    const guardarPlaylist = () => {
        if (!nombre.trim() || canciones.length === 0) return
        if (editIndex !== null) {
            const copia = [...playlists]
            copia[editIndex] = { nombre, canciones }
            persistir(copia)
            setEditIndex(null)
        } else {
            const nueva: Playlist = { nombre, canciones }
            persistir([...playlists, nueva])
        }
        setNombre("")
        setCanciones([])
    }

    const eliminarPlaylist = (i: number) => {
        const copia = playlists.slice()
        copia.splice(i, 1)
        persistir(copia)
    }

    const iniciarEdicion = (i: number) => {
        setEditIndex(i)
        setNombre(playlists[i].nombre)
        setCanciones(playlists[i].canciones)
    }

    return (
        <div className="space-y-6">
            {/* Formulario de creación/edición */}
            <div className="space-y-4 border p-4 rounded-md bg-white shadow-sm">
                <h3 className="text-lg font-semibold">
                    {editIndex !== null ? "Editar Playlist" : "Crear Playlist"}
                </h3>

                <div>
                    <Label>Nombre de la Playlist</Label>
                    <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Agregar canción</Label>
                    <div className="flex gap-2">
                        <Input
                            value={cancion}
                            onChange={(e) => setCancion(e.target.value)}
                            placeholder="YouTube o .mp3"
                        />
                        <Button type="button" onClick={agregarCancion}>+</Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input type="file" accept="audio/*" onChange={(e) => setArchivo(e.target.files?.[0] ?? null)} />
                        <Button type="button" variant="outline" onClick={agregarCancion}>Agregar archivo</Button>
                    </div>
                </div>

                {canciones.length > 0 && (
                    <ul className="list-disc pl-6 text-slate-700">
                        {canciones.map((c, i) => (
                            <li key={i} className="flex items-center justify-between">
                                <span>{c.startsWith("yt:") ? `YouTube: ${c.slice(3)}` : c}</span>
                                <Button variant="ghost" onClick={() => quitarCancion(i)}>Eliminar</Button>
                            </li>
                        ))}
                    </ul>
                )}

                <Button type="button" onClick={guardarPlaylist} className="w-full">
                    {editIndex !== null ? "Guardar Cambios" : "Guardar Playlist"}
                </Button>
            </div>

            {/* Lista de playlists */}
            {playlists.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Playlists guardadas</h3>
                    {playlists.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="flex-1 justify-start"
                                onClick={() => onSelect(p)}
                            >
                                🎶 {p.nombre}
                            </Button>
                            <Button variant="ghost" onClick={() => iniciarEdicion(i)}>Editar</Button>
                            <Button variant="ghost" onClick={() => eliminarPlaylist(i)}>Eliminar</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}