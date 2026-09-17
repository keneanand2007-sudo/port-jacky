import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useScrollReveal(containerRef, selector = ".reveal") {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = container.querySelectorAll(selector)
    if (targets.length === 0) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [containerRef, selector])
}
