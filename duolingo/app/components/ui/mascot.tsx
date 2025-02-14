export function Mascot({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-16 h-16 relative">
        <img
          src="https://logo-marque.com/wp-content/uploads/2021/03/Duolingo-Symbole.jpg"
          alt="Duo mascot"
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <div className="relative bg-white p-4 rounded-2xl shadow-sm max-w-[80%]">
        <div className="absolute left-[-8px] top-4 w-4 h-4 bg-white transform rotate-45" />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  )
} 