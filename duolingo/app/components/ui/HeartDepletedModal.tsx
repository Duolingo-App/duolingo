import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"

interface HeartDepletedModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HeartDepletedModal({ isOpen, onClose }: HeartDepletedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-center p-6">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-lg font-bold">No More Hearts! 💔</DialogTitle>
          <DialogDescription>
            You’ve run out of hearts. Try again tomorrow or restore hearts now.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black">
            Wait Until Tomorrow
          </Button>
          <Button className="bg-[#FFCC00] hover:bg-[#FFBB00] text-black">
            Watch an Ad (Free Heart) 🎥
          </Button>
          <Button className="bg-[#58CC02] hover:bg-[#4AA202] text-white">
            Buy Hearts ❤️
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
