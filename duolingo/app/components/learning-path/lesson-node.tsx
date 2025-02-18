"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Lock, Star, Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { theme } from "../../lib/theme"
import type { LessonStatus } from "../../types/duolingo.ts"

interface LessonNodeProps {
  status: LessonStatus
  position: number
  onClick?: () => void
  className?: string
  hi: string
}

export function LessonNode({ status, position, onClick, className ,hi}: LessonNodeProps) {
  const variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: position * 0.1,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: theme.animations,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  const nodeStyles = {
    locked: "bg-gray-100 border-gray-200",
    active: "bg-white border-[#58cc02] shadow-lg",
    completed: `bg-[${theme.colors.green.primary}] border-[${theme.colors.green.border}]`,
    legendary: `bg-[${theme.colors.gold.primary}] border-[${theme.colors.gold.border}]`,
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover={status !== "locked" ? "hover" : undefined}
      whileTap={status !== "locked" ? "tap" : undefined}
      onClick={status !== "locked" ? onClick : undefined}
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center",
        "border-[3px] transition-colors duration-200",
        nodeStyles[status],
        status !== "locked" && "cursor-pointer",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: -1 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          {status === "locked" && <Lock className="w-6 h-6 text-gray-400" />}
          {status === "active" && <div className="text-[#58cc02] font-bold text-xl">{position + 1}</div>}
          {status === "completed" && <Check className="w-8 h-8 text-white" />}
          {status === "legendary" && <Star className="w-8 h-8 text-white" />}
        </motion.div>
      </AnimatePresence>

      {/* Crown for completed/legendary lessons */}
      {(status === "completed" || status === "legendary") && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-2 -right-2 bg-[#ffc800] p-1 rounded-full border-2 border-[#d4a85b]"
        >
          <Star className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  )
}

