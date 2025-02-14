import { HomeIcon, BookOpenIcon, TrophyIcon, ShoppingBagIcon, GraduationCapIcon, RadioIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function SidebarNav() {
  return (
    <div className="w-[240px] border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Image src="/placeholder.svg?height=32&width=120" alt="Duolingo" width={120} height={32} className="mb-6" />
      </div>

      <div className="flex-1 p-2 space-y-1">
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#1cb0f6] bg-[#ddf4ff] rounded-xl font-bold">
          <HomeIcon className="w-6 h-6" />
          LEARN
        </Link>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#777777] hover:bg-gray-100 rounded-xl">
          <BookOpenIcon className="w-6 h-6" />
          PRACTICE
        </Link>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#777777] hover:bg-gray-100 rounded-xl">
          <TrophyIcon className="w-6 h-6" />
          LEADERBOARDS
        </Link>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#777777] hover:bg-gray-100 rounded-xl">
          <ShoppingBagIcon className="w-6 h-6" />
          SHOP
        </Link>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#777777] hover:bg-gray-100 rounded-xl">
          <GraduationCapIcon className="w-6 h-6" />
          SCHOOLS
        </Link>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#777777] hover:bg-gray-100 rounded-xl">
          <RadioIcon className="w-6 h-6" />
          PODCAST
        </Link>
      </div>
    </div>
  )
}

