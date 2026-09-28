import { useRef } from "react"
import { proof } from "../../data/proof"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Proof() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section id="proof-section"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        CHAPTER 05 — CHALLENGE
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        LEARNING DOESN'T HAPPEN IN COMFORT.
      </h2>

    {proof.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full">
          {proof.map((item) => (
              <a
              key={item.title}
              href={item.url || undefined}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              className="reveal text-left border border-white/10 rounded-lg p-6 hover:border-white/25 transition-colors"
            >
              <p className="font-display text-lg text-text-primary">{item.title}</p>
              <p className="font-body text-sm text-text-secondary mt-1">
                {item.issuer} · {item.year}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="reveal font-body text-base text-text-secondary mt-12 max-w-md">
            Documenting the milestones as I go — this chapter is being written in real time.
        </p>
      )}
    </section>
  )
}

export default Proof
