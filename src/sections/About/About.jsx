import { useRef } from "react"
import { about } from "../../data/about"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function About() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      id="about-section" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {about.chapter} — {about.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        {about.statement}
      </h2>

      <div className="mt-10 max-w-xl space-y-5">
        {about.paragraphs.map((p, i) => (
          <p
            key={i}
            className="reveal font-body text-base md:text-lg text-text-secondary leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>

      <p className="reveal font-body text-sm tracking-wide text-text-muted mt-12 italic">
        {about.meta}
      </p>
    </section>
  )
}

export default About
