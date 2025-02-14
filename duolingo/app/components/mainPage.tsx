"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UnitPath } from "../components/learning-path/unit-path"
import { CharacterMascot } from "../components/character-mascot"
import type { Unit } from "@/app/types/duolingo"

// Sample data - in a real app, this would come from an API
const units: Unit[] = [
  {
    id: "unit-1",
    title: "Unit 1",
    description: "Form basic sentences, greet people",
    color: "green",
    guidebook: true,
    lessons: [
      { id: "1-1", status: "completed", position: 0, xpPoints: 10, title: "Basics 1" },
      { id: "1-2", status: "completed", position: 1, xpPoints: 10, title: "Basics 2" },
      { id: "1-3", status: "active", position: 2, xpPoints: 15, title: "Phrases" },
      { id: "1-4", status: "locked", position: 3, xpPoints: 15, title: "Greetings" },
      { id: "1-5", status: "locked", position: 4, xpPoints: 20, title: "Review" },
    ],
  },
  {
    id: "unit-2",
    title: "Unit 2",
    description: "Get around in a city",
    color: "purple",
    guidebook: true,
    lessons: Array(5)
      .fill(null)
      .map((_, i) => ({
        id: `2-${i + 1}`,
        status: "locked",
        position: i,
        xpPoints: 15,
        title: `Lesson ${i + 1}`,
      })),
  },
  // Add more units as needed
]

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId)
    // Handle lesson selection logic
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      {units.map((unit, index) => (
        <motion.div
          key={unit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative"
        >
          <UnitPath unit={unit} onLessonClick={handleLessonClick} />

          {/* Character mascots */}
          {index === 0 && (
            <div className="absolute right-[-80px] top-16">
              <CharacterMascot type="duo" className="w-24 h-24" />
            </div>
          )}
          {index === 1 && (
            <div className="absolute left-[-60px] top-40">
              <CharacterMascot type="lily" className="w-20 h-20" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}