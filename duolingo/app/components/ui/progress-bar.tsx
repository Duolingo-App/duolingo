export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-[#58CC02] transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
} 