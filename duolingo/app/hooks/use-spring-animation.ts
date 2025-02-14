"use client"

import { useSpring } from "@react-spring/web"

export function useSpringAnimation(delay = 0) {
  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay,
    config: {
      tension: 280,
      friction: 20,
    },
  })

  return spring
}

