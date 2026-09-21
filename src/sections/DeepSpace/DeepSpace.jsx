import { useRef } from "react"
import { deepSpace } from "../../data/deepSpace"
import { contact } from "../../data/contact"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function DeepSpace() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <h2 className="reveal font-display text-2xl md:text-4xl leading-tight text-text-primary max-w-xl">
        {deepSpace.lineOne}
      </h2>

      <p className="reveal font-body text-sm tracking-widest uppercase text-text-secondary mt-6">
        {deepSpace.lineTwo}
      </p>

        <a
        href={"mailto:" + contact.email}
        className="reveal font-body text-sm tracking-widest uppercase text-text-muted mt-3 hover:text-text-primary transition-colors"
      >
        {deepSpace.lineThree}
      </a>
    </section>
  )
}

export default DeepSpace
