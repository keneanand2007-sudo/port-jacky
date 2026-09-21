import { useRef } from "react"
import { experience } from "../../data/experience"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Experience() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {experience.chapter} — {experience.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        {experience.statement}
      </h2>

      <p className="reveal font-body text-base md:text-lg text-text-secondary leading-relaxed mt-8 max-w-xl">
        {experience.intro}
      </p>

      <div className="reveal mt-14 flex flex-wrap justify-center gap-3">
        {experience.positioning.map((step, i) => (
          <span
            key={step}
            className="font-body text-xs tracking-widest uppercase text-text-secondary border border-white/10 rounded-full px-4 py-2"
          >
            {step}
            {i < experience.positioning.length - 1 && (
              <span className="ml-3 text-text-muted">→</span>
            )}
          </span>
        ))}
      </div>

      <div className="reveal mt-14 max-w-2xl">
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          MY CYCLE
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {experience.cycle.join(" → ")}
        </p>
      </div>
    </section>
  )
}

export default Experience
