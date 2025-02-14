import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import Image from "next/image"
import { LineChart } from "lucide-react"
import { TrophyIcon } from "@/app/components/icons/trophy"

export function RightSidebar() {
  return (
    <div className="w-[320px] border-l border-gray-200 p-4 space-y-4">
      {/* Super upsell card */}
      <Card className="p-4 bg-white rounded-xl border-0 shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg mb-1">Try Super for free</h3>
            <p className="text-sm text-gray-500">No ads, personalized practice, and unlimited Legendary!</p>
          </div>
          <Image src="/placeholder.svg?height=60&width=60" alt="Super mascot" width={60} height={60} />
        </div>
        <Button className="w-full bg-[#1cb0f6] hover:bg-[#1cb0f6]/90 text-white">TRY 2 WEEKS FREE</Button>
      </Card>

      {/* Leaderboard unlock card */}
      <Card className="p-4 bg-white rounded-xl border-0 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold">Unlock Leaderboards!</h3>
            <p className="text-sm text-gray-500">Complete 9 more lessons to start competing</p>
          </div>
        </div>
      </Card>

      {/* XP Progress card */}
      <Card className="p-4 bg-white rounded-xl border-0 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">XP Progress</h3>
          <button className="text-[#1cb0f6] text-sm font-bold">EDIT GOAL</button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Daily Goal</span>
            <span className="text-gray-500">13/20 XP</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-[#ffc800]" />
          </div>
          <div className="h-32 flex items-end">
            <LineChart className="w-full h-full text-[#1cb0f6]" />
          </div>
        </div>
      </Card>
    </div>
  )
}

