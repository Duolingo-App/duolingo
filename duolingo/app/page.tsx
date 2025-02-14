"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
// import Image from "next/image";

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Add a small delay to ensure smooth transition
    const timeout = setTimeout(() => {
      router.push('/onboarding')
    }, 100)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div>
      hiii
    </div>
  )
}


