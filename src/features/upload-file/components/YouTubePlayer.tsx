import YouTube from "react-youtube"

interface YouTubePlayerProps {
  videoId: string
  autoPlay?: boolean
}

export default function YouTubePlayer({ videoId, autoPlay = false }: YouTubePlayerProps) {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        height: "0", // ocultamos el video si solo quieres música
        width: "0",
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
        },
      }}
    />
  )
}
