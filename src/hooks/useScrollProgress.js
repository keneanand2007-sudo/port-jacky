import { useState, useEffect } from "react"

// Clean, non-overlapping scroll "chapter" windows.
// Chapter N covers scrollY range [N * viewportHeight, (N+1) * viewportHeight].
// Returns 0 before the window starts, 0→1 across the window, 1 after it ends.
export function useChapterProgress(chapterIndex) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const vh = window.innerHeight
      const start = chapterIndex * vh
      const scrolled = window.scrollY - start
      const value = Math.min(1, Math.max(0, scrolled / vh))
      setProgress(value)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [chapterIndex])

  return progress
}
