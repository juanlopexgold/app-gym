import { useState, useRef, useEffect } from "react"
import { Playlist } from "../types"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import YouTube from "react-youtube"

interface EnhancedMusicPlayerProps {
  playlist: Playlist
  autoPlay?: boolean
}

export default function EnhancedMusicPlayer({ playlist, autoPlay = false }: EnhancedMusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showPlaylist, setShowPlaylist] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const youtubePlayerRef = useRef<any>(null)

  const currentSong = playlist.canciones[currentIndex]
  const isYouTube = currentSong?.startsWith("yt:")

  // Función para obtener el nombre de la canción
  const getSongName = (song: string) => {
    if (song.startsWith("yt:")) {
      return `YouTube: ${song.slice(3)}`
    }
    return song.split('/').pop() || song
  }

  // Control de reproducción
  const togglePlayPause = () => {
    if (isYouTube) {
      if (youtubePlayerRef.current) {
        if (isPlaying) {
          youtubePlayerRef.current.pauseVideo()
        } else {
          youtubePlayerRef.current.playVideo()
        }
      }
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
      }
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (isYouTube) {
      if (youtubePlayerRef.current) {
        if (isMuted) {
          youtubePlayerRef.current.unMute()
        } else {
          youtubePlayerRef.current.mute()
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted
      }
    }
    setIsMuted(!isMuted)
  }

  const previousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsPlaying(true) // Reproducir inmediatamente
    }
  }

  const nextSong = () => {
    if (currentIndex < playlist.canciones.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsPlaying(true) // Reproducir inmediatamente
    }
  }

  const selectSong = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(true) // Reproducir inmediatamente
  }

  // Eventos de YouTube
  const onYouTubeReady = (event: any) => {
    youtubePlayerRef.current = event.target
    if (autoPlay) {
      event.target.playVideo()
      setIsPlaying(true)
    }
  }

  const onYouTubeStateChange = (event: any) => {
    const state = event.data
    if (state === 1) { // Playing
      setIsPlaying(true)
    } else if (state === 2) { // Paused
      setIsPlaying(false)
    } else if (state === 0) { // Ended
      // Cuando termina, iniciar la siguiente automáticamente
      if (currentIndex < playlist.canciones.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
  }

  // Eventos de audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      // Cuando termina, iniciar la siguiente automáticamente
      if (currentIndex < playlist.canciones.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [currentIndex])

  // Auto-play cuando cambia la canción
  useEffect(() => {
    if (isPlaying) {
      if (isYouTube && youtubePlayerRef.current) {
        youtubePlayerRef.current.playVideo()
      } else if (!isYouTube && audioRef.current) {
        audioRef.current.play()
      }
    }
  }, [currentIndex, isPlaying, isYouTube])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Información de la playlist */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          🎵 {playlist.nombre}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {currentIndex + 1} de {playlist.canciones.length} canciones
        </p>
      </div>

      {/* Reproductor principal */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-lg">
        {/* Canción actual */}
        <div className="text-center mb-4">
          <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
            {getSongName(currentSong)}
          </p>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            onClick={previousSong}
            disabled={currentIndex === 0}
            variant="outline"
            size="sm"
            className="p-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={togglePlayPause}
            className="p-3 bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button
            onClick={nextSong}
            disabled={currentIndex === playlist.canciones.length - 1}
            variant="outline"
            size="sm"
            className="p-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Barra de progreso (solo para archivos locales) */}
        {!isYouTube && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Control de volumen */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={toggleMute}
            variant="outline"
            size="sm"
            className="p-2 border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        {/* Botón para mostrar/ocultar playlist */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => setShowPlaylist(!showPlaylist)}
            variant="outline"
            size="sm"
            className="border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {showPlaylist ? 'Ocultar Lista' : 'Mostrar Lista'}
          </Button>
        </div>
      </div>

      {/* Lista de canciones */}
      {showPlaylist && (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-lg">
          <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-3">Lista de canciones:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {playlist.canciones.map((song, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  index === currentIndex
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                }`}
                onClick={() => selectSong(index)}
              >
                <span className="text-sm truncate flex-1">
                  {index + 1}. {getSongName(song)}
                </span>
                {index === currentIndex && isPlaying && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reproductores ocultos */}
      {isYouTube ? (
        <YouTube
          videoId={currentSong.slice(3)}
          opts={{
            height: "0",
            width: "0",
            playerVars: { 
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              enablejsapi: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              rel: 0
            },
          }}
          onReady={onYouTubeReady}
          onStateChange={onYouTubeStateChange}
        />
      ) : (
        <audio
          ref={audioRef}
          src={currentSong}
          preload="metadata"
        />
      )}
    </div>
  )
}
