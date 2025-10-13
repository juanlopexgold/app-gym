import { Playlist } from "@/features/upload-file/types"

// Función para extraer el ID del video de YouTube
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

// URLs de YouTube proporcionadas
const youtubeUrls = [
  "https://youtu.be/s8hA0QRIwfo?si=GDbHYZlXDHtNHmvA",
  "https://youtu.be/f5omY8jVrSM?si=OlaxPjjkhFdXu93I", 
  "https://youtu.be/tbneQDc2H3I?si=tT69__oSWfzsAIeI",
  "https://youtu.be/hlgx4OKsWtE?si=T1fMtE5VhTIlcVW9",
  "https://youtu.be/PaKr9gWqwl4?si=Te1Na6OapT2xhp3J",
  "https://youtu.be/50-_oTkmF5I?si=kTXrOf1A2b-jRyvt",
  "https://youtu.be/GMFewiplIbw?si=VxSYhiNwfsO1SSbP",
  "https://youtu.be/jZGpkLElSu8?si=6JASDMv34bGUn4Tl"
]

// Crear la playlist predeterminada
export const defaultPlaylist: Playlist = {
  id: "default",
  nombre: "Lista Predeterminada",
  canciones: youtubeUrls.map(url => {
    const videoId = extraerVideoId(url)
    return videoId ? `yt:${videoId}` : url
  }).filter(Boolean),
  tipo: 'youtube'
}

// Función para obtener todas las playlists (incluyendo la predeterminada)
export function getAllPlaylists(): Playlist[] {
  const stored = localStorage.getItem("playlists")
  const userPlaylists: Playlist[] = stored ? JSON.parse(stored) : []
  
  // Siempre incluir la playlist predeterminada al inicio
  return [defaultPlaylist, ...userPlaylists]
}

// Función para guardar solo las playlists del usuario (sin la predeterminada)
export function saveUserPlaylists(playlists: Playlist[]): void {
  // Filtrar la playlist predeterminada antes de guardar
  const userPlaylists = playlists.filter(p => p.id !== "default")
  localStorage.setItem("playlists", JSON.stringify(userPlaylists))
}
