"use client"

import { motion, useAnimation } from "framer-motion"
import Image from "next/image"

interface CharacterMascotProps {
  type: "duo" | "lily" | "duo-sad"
  className?: string
  animate?: boolean
}

export function CharacterMascot({ type, className, animate = true }: CharacterMascotProps) {
  const controls = useAnimation()



  

  return (
    <motion.div
      animate={controls}
      className={className}
      whileHover={{ scale: 1.1, rotate: [-5, 5] }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={`/placeholder.svg?height=96&width=96&text=${type}`}
        alt={`Duolingo ${type} character`}
        width={96}
        height={96}
        className="object-contain"
      />
    </motion.div>
  )
}

