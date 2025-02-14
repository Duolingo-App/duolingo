import { BookOpen } from "lucide-react"

interface UnitCardProps {
  title: string
  description: string
  color: "green" | "purple" | "teal"
  onClick?: () => void
}

const colors = {
  green: "bg-[#58cc02] hover:bg-[#58cc02]/90",
  purple: "bg-[#ce82ff] hover:bg-[#ce82ff]/90",
  teal: "bg-[#00cd9c] hover:bg-[#00cd9c]/90",
}

export function UnitCard({ title, description, color, onClick }: UnitCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${colors[color]} w-full rounded-xl p-4 text-left text-white transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <BookOpen className="w-6 h-6" />
      </div>
    </button>
  )
}

