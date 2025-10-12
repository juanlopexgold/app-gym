import { useState } from "react"
import { Playlist } from "../types"
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
    <div className="space-y-2 sm:space-y-3 text-center">
          <p className="font-semibold text-xs sm:text-sm break-all text-slate-800 dark:text-slate-200">Reproduciendo: {esYouTube ? `YouTube ${actual.slice(3)}` : actual}</p>

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
        <audio src={actual} controls autoPlay={autoPlay} className="w-full" />
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          onClick={anterior} 
          disabled={index === 0}
          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10"
        >
          ⏮️ Anterior
        </Button>
        <Button 
          variant="outline" 
          onClick={siguiente} 
          disabled={index === playlist.canciones.length - 1}
          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10"
        >
          ⏭️ Siguiente
        </Button>
      </div>
    </div>
  )
}
