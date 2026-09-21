import { useRef } from "react"
import { education } from "../../data/education"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Education() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {education.chapter} — {education.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        {education.statement}
      </h2>

      <div className="reveal mt-12 max-w-xl border-l border-white/10 pl-6 text-left">
        <p className="font-display text-xl md:text-2xl text-text-primary">
          {education.program}
        </p>
        <p className="font-body text-base text-text-secondary mt-1">
          {education.university}
        </p>
        <p className="font-body text-sm tracking-wide uppercase text-text-muted mt-2">
          {education.status}
        </p>
      </div>

      <div className="reveal mt-14 max-w-2xl">
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          FOCUS AREAS
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {education.focusAreas.join(" · ")}
        </p>
      </div>
    </section>
  )
}

export default Education
