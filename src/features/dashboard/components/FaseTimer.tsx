interface FaseTimerProps {
    fase: string
    tiempo: number
  }
  
  export default function FaseTimer({ fase, tiempo }: FaseTimerProps) {
    return (
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{fase}</h3>
        <p className="text-5xl font-bold text-primary">{tiempo}s</p>
      </div>
    )
  }
