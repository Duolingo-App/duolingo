import type { ReactNode } from "react"

interface OptionCardProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  selected?: boolean
  onClick?: () => void
}

export function OptionCard({ icon, title, subtitle, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 mb-3
        ${selected ? "border-[#58CC02] bg-[#58CC02]/10" : "border-gray-200 hover:border-gray-300"}`}
    >
      {icon && <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">{icon}</div>}
      <div className="text-left">
        <h3 className="font-bold text-gray-700">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </button>
  )
} 