import { useEffect, useState } from 'react'

interface CircularTimerProps {
  time: number
  totalTime: number
  size?: number
  strokeWidth?: number
  className?: string
}

export default function CircularTimer({ 
  time, 
  totalTime, 
  size = 200, 
  strokeWidth = 8,
  className = ""
}: CircularTimerProps) {
  const [animatedTime, setAnimatedTime] = useState(time)

  // Animar el cambio de tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedTime(time)
    }, 50)
    return () => clearTimeout(timer)
  }, [time])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (totalTime - animatedTime) / totalTime
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress * circumference)

  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Círculo de fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        
        {/* Círculo de progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
          style={{
            strokeDasharray,
            strokeDashoffset,
          }}
        />
      </svg>
      
      {/* Texto del tiempo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-100">
            {formatTime(animatedTime)}
          </div>
        </div>
      </div>
    </div>
  )
}
