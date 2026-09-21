import { useRef } from "react"
import { experiments } from "../../data/experiments"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Experiments() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {experiments.chapter} — {experiments.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-8 max-w-2xl">
        {experiments.headline}
      </h2>

      <p className="reveal font-body text-base text-text-secondary leading-relaxed mt-8 max-w-lg">
        {experiments.description}
      </p>

      <p className="reveal font-body text-xs tracking-widest uppercase text-text-muted mt-14">
        {experiments.label}
      </p>
    </section>
  )
}

export default Experiments
