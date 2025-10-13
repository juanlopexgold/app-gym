import { useState, useRef, useEffect } from "react"
import { Playlist } from "../types"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import YouTube from "react-youtube"

interface EnhancedMusicPlayerProps {
  playlist: Playlist
  autoPlay?: boolean
}

type MinimalYouTubePlayer = {
  playVideo?: () => void
  pauseVideo?: () => void
  mute?: () => void
  unMute?: () => void
}

export default function EnhancedMusicPlayer({ playlist, autoPlay = false }: EnhancedMusicPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const youtubePlayerRef = useRef<MinimalYouTubePlayer | null>(null)

  const currentSong = playlist.canciones[currentIndex]
  const isYouTube = !!currentSong && currentSong.startsWith("yt:")

  const getSongName = (song: string) => {
    if (!song) return ''
    if (song.startsWith("yt:")) return `YouTube: ${song.slice(3)}`
    return song.split('/').pop() || song
  }

  const togglePlayPause = () => {
    if (isYouTube) {
      const yt = youtubePlayerRef.current
      if (yt) {
        if (isPlaying) yt.pauseVideo?.()
        else yt.playVideo?.()
      }
    } else {
      const audio = audioRef.current
      if (audio) {
        if (isPlaying) audio.pause()
        else audio.play()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (isYouTube) {
      const yt = youtubePlayerRef.current
      if (yt) {
        if (isMuted) yt.unMute?.()
        else yt.mute?.()
      }
    } else if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  const previousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsPlaying(true)
    }
  }

  const nextSong = () => {
    if (currentIndex < playlist.canciones.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsPlaying(true)
    }
  }

  const selectSong = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(true)
  }

  const onYouTubeReady = (event: { target?: unknown }) => {
    const target = event.target as unknown as MinimalYouTubePlayer
    youtubePlayerRef.current = target
    if (autoPlay) target.playVideo?.()
  }

  const onYouTubeStateChange = (event: { data?: number }) => {
    const state = event.data
    if (state === 1) setIsPlaying(true)
    else if (state === 2) setIsPlaying(false)
    else if (state === 0) {
      if (currentIndex < playlist.canciones.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsPlaying(true)
      } else setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (currentIndex < playlist.canciones.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsPlaying(true)
      } else setIsPlaying(false)
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
  }, [currentIndex, playlist.canciones.length])

  useEffect(() => {
    if (isPlaying) {
      if (isYouTube && youtubePlayerRef.current) youtubePlayerRef.current.playVideo?.()
      else if (!isYouTube && audioRef.current) audioRef.current.play()
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
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">🎵 {playlist.nombre}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{currentIndex + 1} de {playlist.canciones.length} canciones</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-lg">
        <div className="text-center mb-4">
          <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{getSongName(currentSong)}</p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Button onClick={previousSong} disabled={currentIndex === 0} variant="outline" size="sm" className="p-2">
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button onClick={togglePlayPause} className="p-3 bg-primary text-white shadow-lg">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button onClick={nextSong} disabled={currentIndex === playlist.canciones.length - 1} variant="outline" size="sm" className="p-2">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {!isYouTube && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Button onClick={toggleMute} variant="outline" size="sm" className="p-2">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={() => setShowPlaylist(!showPlaylist)} variant="outline" size="sm" className="p-2">
            {showPlaylist ? 'Ocultar Lista' : 'Mostrar Lista'}
          </Button>
        </div>

        {isYouTube && (
          <div className="mt-4">
            <YouTube
              videoId={currentSong?.slice(3)}
              opts={{ height: '0', width: '0', playerVars: { autoplay: 0, controls: 0, enablejsapi: 1 } }}
              onReady={onYouTubeReady}
                onStateChange={onYouTubeStateChange}
            />
          </div>
        )}

        {!isYouTube && (
          <audio ref={audioRef} src={currentSong} preload="metadata" />
        )}

        {showPlaylist && (
          <div className="mt-4 space-y-1 max-h-48 overflow-y-auto">
            {playlist.canciones.map((c, i) => (
              <button key={i} onClick={() => selectSong(i)} className={`w-full text-left px-3 py-2 rounded ${i === currentIndex ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
                {getSongName(c)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

