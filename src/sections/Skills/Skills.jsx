import { useRef } from "react"
import { skillGroups, exploring } from "../../data/skills"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Skills() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section id="skills-section"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        CHAPTER 03 — CAPABILITY
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        SKILLS
      </h2>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10 max-w-4xl">
        {skillGroups.map((group) => (
          <div key={group.category} className="reveal">
            <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item} className="font-body text-base text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="reveal mt-16 max-w-2xl">
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          {exploring.label}
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {exploring.items.join(" · ")}
        </p>
      </div>
    </section>
  )
}

export default Skills
