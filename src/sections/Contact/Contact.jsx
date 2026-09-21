import { useRef } from "react"
import { contact } from "../../data/contact"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Contact() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        {contact.chapter} — {contact.eyebrow}
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-8 max-w-2xl">
        {contact.lineOne}
      </h2>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-2 max-w-2xl">
        {contact.lineTwo}
      </h2>

        <a
        href={"mailto:" + contact.email}
        className="reveal mt-14 font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
      >
          {contact.cta} →
      </a>

      <p className="reveal font-body text-sm text-text-muted mt-4">{contact.email}</p>

      <div className="reveal mt-10 flex gap-6">
        {contact.links.map((link) => (
            <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
