import { Lock, Star } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface LessonNodeProps {
  type: "locked" | "active" | "completed"
  position?: "start" | "middle" | "end"
}

export function LessonNode({ type, position = "middle" }: LessonNodeProps) {
  const baseStyles = "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 border-[3px]"

  const nodeStyles = {
    locked: "bg-gray-100 border-gray-200 cursor-not-allowed",
    active: "bg-white border-[#58cc02] cursor-pointer hover:bg-[#f7f7f7] shadow-lg",
    completed: "bg-[#58cc02] border-[#46a302] cursor-pointer hover:bg-[#46a302]",
  }

  const iconStyles = {
    locked: "text-gray-400 w-6 h-6",
    active: "text-[#58cc02] w-8 h-8",
    completed: "text-white w-8 h-8",
  }

  return (
    <div className={cn(baseStyles, nodeStyles[type], "relative")}>
      {type === "locked" ? (
        <Lock className={iconStyles.locked} />
      ) : type === "completed" ? (
        <Star className={iconStyles.completed} />
      ) : (
        <div className={`${iconStyles.active} font-bold`}>1</div>
      )}

      {/* Crown for completed lessons */}
      {type === "completed" && (
        <div className="absolute -top-2 -right-2 bg-[#ffc800] p-1 rounded-full border-2 border-[#d4a85b]">
          <Star className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  )
}

