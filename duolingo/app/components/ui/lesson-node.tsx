import { Lock, BookOpen, Star } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface LessonNodeProps {
  type: "locked" | "active" | "completed" | "legendary"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function LessonNode({ type, size = "md", onClick }: LessonNodeProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  const icons = {
    locked: Lock,
    active: BookOpen,
    completed: BookOpen,
    legendary: Star,
  }

  const Icon = icons[type]

  const baseStyles = "rounded-full flex items-center justify-center transition-all"
  const nodeStyles = {
    locked: "bg-gray-200 text-gray-400",
    active: "bg-[#58cc02] text-white hover:bg-[#58cc02]/90 cursor-pointer",
    completed: "bg-[#1cb0f6] text-white",
    legendary: "bg-[#ffc800] text-white",
  }

  return (
    <div className={cn(baseStyles, nodeStyles[type], sizes[size])} onClick={type !== "locked" ? onClick : undefined}>
      <Icon className="w-6 h-6" />
    </div>
  )
}

