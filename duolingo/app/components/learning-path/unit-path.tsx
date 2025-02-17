"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { Button } from "@/app/components/ui/Button"
import { LessonNode } from "./lesson-node"
import { theme } from "@/app/lib/theme"
import type { Unit } from "@/app/types/duolingo"

interface UnitPathProps {
  unit: Unit
  onLessonClick?: (lessonId: string) => void
}

export function UnitPath({ unit, onLessonClick }: UnitPathProps) {
  const colorStyles = theme.colors[unit.color]

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="relative">
      {/* Unit Header */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-[${colorStyles.primary}] rounded-2xl p-4 border-b-4 border-[${colorStyles.border}]`}
      >
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-bold text-xl">{unit.title}</h3>
            <p className="text-sm opacity-90">{unit.description}</p>
          </div>
          {unit.guidebook && (
            <Button className="text-white hover:bg-white/10 bg-transparent">
              <BookOpen className="w-5 h-5 mr-2" />
              GUIDEBOOK
            </Button>
          )}
        </div>
      </motion.div>

      {/* Learning Path */}
      <div className="relative mt-8 flex flex-col items-center">
        {/* SVG Path Line */}
        <svg
          className="absolute top-0 left-1/2 h-full w-4 -translate-x-1/2 -z-10"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          <motion.path d="M 2 0 L 2 100" stroke="#e5e7eb" strokeWidth="2" fill="none" variants={pathVariants} />
        </svg>

        {/* Lesson Nodes */}
        <div className="space-y-6">
          {unit.lessons.map((lesson, index) => (
            <LessonNode
              key={lesson.id}
              status={lesson.status}
              position={index}
              onClick={() => onLessonClick?.(lesson.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

