import { useRef } from "react"
import { projects } from "../../data/projects"
import { useScrollReveal } from "../../experience/animation/useScrollReveal"

function Projects() {
  const containerRef = useRef(null)
  useScrollReveal(containerRef)

  return (
    <section id="projects-section"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      <p className="reveal font-body text-xs tracking-widest uppercase text-text-secondary">
        CHAPTER 06 — CREATION
      </p>

      <h2 className="reveal font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl">
        PROJECTS
      </h2>

      {projects.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
          {projects.map((project, i) => (
            <div
              key={project.title}
              id={`project-card-${i}`}
              className="reveal text-left border border-white/10 rounded-lg p-6 hover:border-white/25 transition-colors"
            >
              <p className="font-body text-xs tracking-widest uppercase text-text-muted">
                PROJECT {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-xl text-text-primary mt-2">{project.title}</p>
              <p className="font-body text-sm text-text-secondary mt-2">{project.description}</p>
              <p className="font-body text-xs tracking-wide uppercase text-text-muted mt-4">
                {project.technologies.join(" · ")} — {project.year}
              </p>
              <div className="mt-4 flex gap-4">
                {project.liveUrl && (
                    <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
                  >
                    VIEW PROJECT →
                  </a>
                )}
                {project.sourceUrl && (
                    <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
                  >
                    SOURCE →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="reveal font-body text-base text-text-secondary mt-12 max-w-md">
          Coming soon — this asteroid field is still forming.
        </p>
      )}
    </section>
  )
}

export default Projects
