import { LessonNode } from "./lesson-node"
import { Button } from "@/app/components/ui/button"
import { BookOpen } from "lucide-react"

interface UnitPathProps {
  title: string
  description: string
  color: "green" | "purple" | "teal"
  lessons: Array<{
    type: "locked" | "active" | "completed"
    position?: "start" | "middle" | "end"
  }>
}

const colors = {
  green: {
    bg: "bg-[#58cc02]",
    hover: "hover:bg-[#46a302]",
    border: "border-[#46a302]",
    text: "text-white",
  },
  purple: {
    bg: "bg-[#ce82ff]",
    hover: "hover:bg-[#bb6fee]",
    border: "border-[#bb6fee]",
    text: "text-white",
  },
  teal: {
    bg: "bg-[#00cd9c]",
    hover: "hover:bg-[#00b589]",
    border: "border-[#00b589]",
    text: "text-white",
  },
}

export function UnitPath({ title, description, color, lessons }: UnitPathProps) {
  const colorStyles = colors[color]

  return (
    <div className="relative">
      <div className={`${colorStyles.bg} ${colorStyles.hover} rounded-2xl p-4 border-b-4 ${colorStyles.border}`}>
        <div className="flex items-center justify-between">
          <div className={colorStyles.text}>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
          <Button variant="ghost" className={`${colorStyles.text} hover:bg-white/10`}>
            <BookOpen className="w-5 h-5 mr-2" />
            GUIDEBOOK
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-6 relative">
        {/* Vertical connecting line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gray-200" />

        {lessons.map((lesson, index) => (
          <div key={index} className="relative z-10">
            <LessonNode type={lesson.type} position={lesson.position || "middle"} />
          </div>
        ))}
      </div>
    </div>
  )
}

