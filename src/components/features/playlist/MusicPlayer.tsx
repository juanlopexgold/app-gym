import { useState } from "react"
import { Playlist } from "@/types/playlist"
import { Button } from "@/components/ui/button"
import YouTube from "react-youtube"

interface MusicPlayerProps {
  playlist: Playlist
  autoPlay?: boolean
}

export default function MusicPlayer({ playlist, autoPlay = false }: MusicPlayerProps) {
  const [index, setIndex] = useState(0)
  const actual = playlist.canciones[index]
  const esYouTube = actual.startsWith("yt:")

  const siguiente = () => {
    if (index < playlist.canciones.length - 1) setIndex(index + 1)
  }
  const anterior = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <div className="space-y-2 text-center">
      <p className="font-semibold">Reproduciendo: {esYouTube ? `YouTube ${actual.slice(3)}` : actual}</p>

      {esYouTube ? (
        <YouTube
          videoId={actual.slice(3)}
          opts={{
            height: "0",
            width: "0",
            playerVars: { autoplay: autoPlay ? 1 : 0 },
          }}
        />
      ) : (
        <audio src={actual} controls autoPlay={autoPlay} />
      )}

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={anterior} disabled={index === 0}>⏮️ Anterior</Button>
        <Button variant="outline" onClick={siguiente} disabled={index === playlist.canciones.length - 1}>⏭️ Siguiente</Button>
      </div>
    </div>
  )
}
