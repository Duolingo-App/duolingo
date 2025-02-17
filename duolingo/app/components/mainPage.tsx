"use client"

import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { UnitPath } from "../components/learning-path/unit-path"
import { CharacterMascot } from "../components/character-mascot"
import type { Unit } from "@/app/types/duolingo"
import { useRouter } from "next/navigation" // Changed from 'next/router'
import { AuthContext } from "@/app/context/AuthContext" // Import AuthContext

export default function Home() {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const router = useRouter()
  const useAuth = useContext(AuthContext)
   // Access the user from AuthContext
   const user = useAuth?.user

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token") // Get the access token
        if (!token) {
          throw new Error("No access token found")
        }

        const response = await fetch("/api/units", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch units")
        }

        const data = await response.json()
        setUnits(data)
      } catch (err:any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUnits()
  }, [])

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId)
    router.push(`/exercise/${lessonId}`)
    console.log(`Selected lesson: ${lessonId}`)
    // Handle lesson selection logic
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      {/* Display user information */}
      {user && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-gray-500">Email: {user.email}</p>
        </div>
      )}

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