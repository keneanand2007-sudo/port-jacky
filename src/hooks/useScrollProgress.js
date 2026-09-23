import { useState, useEffect } from "react"

// Tracks a section's real scroll position: 0 = not yet reached (below
// viewport), rises 0→1 as it scrolls through, 1 = fully scrolled past
// (top of section has gone above the top of the viewport).
export function useSectionProgress(elementId) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const el = document.getElementById(elementId)
      if (!el) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const span = vh + rect.height

      const value = Math.min(1, Math.max(0, (vh - rect.top) / span))
      setProgress(value)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [elementId])

  return progress
}
