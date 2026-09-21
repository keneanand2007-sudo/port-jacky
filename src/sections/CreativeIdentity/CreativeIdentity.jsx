import { useRef } from "react"
import { creativeIdentity } from "../../data/creativeIdentity"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function CreativeIdentity() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {creativeIdentity.chapter} — {creativeIdentity.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-8 max-w-2xl">
        {creativeIdentity.lineOne}
      </h2>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-2 max-w-2xl">
        {creativeIdentity.lineTwo}
      </h2>

      <p className="reveal font-body text-base text-text-secondary leading-relaxed mt-10 max-w-lg">
        {creativeIdentity.supporting}
      </p>
    </section>
  )
}

export default CreativeIdentity
