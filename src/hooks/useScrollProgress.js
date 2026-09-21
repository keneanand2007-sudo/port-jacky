import { useState, useEffect } from "react"

export function useHeroScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const heroHeight = window.innerHeight
      const scrolled = window.scrollY
      const value = Math.min(1, Math.max(0, scrolled / heroHeight))
      setProgress(value)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}
